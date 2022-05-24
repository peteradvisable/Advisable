import React from "react";
import { useApolloClient } from "@apollo/client";
import { Tooltip } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import composeStyles from "src/utilities/composeStyles";
import { useNotifications } from "src/components/Notifications";
import { useFavoriteArticle, useUnfavoriteArticle } from "../queries";

function BookmarkIcon({ width = "20", ...props }) {
  return (
    <svg fill="none" viewBox="0 0 20 20" width={width} {...props}>
      <path
        strokeWidth="2"
        d="M9.553 14.606L6 16.382V4a1 1 0 011-1h6a1 1 0 011 1v12.382l-3.553-1.776-.447-.224-.447.224z"
      ></path>
    </svg>
  );
}

const buttonClasses = composeStyles({
  base: `
    group
    flex
    justify-center
    items-center
    ring-1
    ring-inset
    ring-neutral200
    hover:ring-2
    hover:ring-neutral300
    rounded-full
  `,
  variants: {
    size: {
      sm: `h-8 min-w-[32px]`,
      md: `h-10 min-w-[40px]`,
    },
  },
});

const iconClasses = composeStyles({
  base: `
    fill-none
    stroke-neutral600
    group-hover:stroke-neutral900
  `,
  variants: {
    size: {
      sm: `h-[16px] w-[16px]`,
      md: `h-[20px] w-[20px]`,
    },
    active: `fill-blue500 !stroke-blue500 group-hover:fill-blue500`,
  },
});

function FavoriteArticleButton({ article, size, className }) {
  const viewer = useViewer();
  const { isFavorited } = article;
  const client = useApolloClient();
  const [favorite] = useFavoriteArticle(article);
  const [unfavorite] = useUnfavoriteArticle(article);
  const notification = useNotifications();

  if (viewer?.__typename !== "User") return null;

  const handleClick = async () => {
    client.cache.modify({
      id: client.cache.identify(article),
      fields: {
        isFavorited: () => !isFavorited,
      },
    });

    const action = isFavorited ? unfavorite : favorite;
    const res = await action();

    if (res.errors) {
      notification.error("Something went wrong, please try again.");
      return;
    }

    notification.notify(
      isFavorited ? "Removed from bookmarks" : "Added to bookmarks",
    );
  };

  return (
    <Tooltip placement="bottom" content={!isFavorited && "Add to Bookmarks"}>
      <button
        onClick={handleClick}
        className={buttonClasses({ active: isFavorited, className, size })}
        aria-label={isFavorited ? "Remove from Bookmarks" : "Add to Bookmarks"}
      >
        <BookmarkIcon className={iconClasses({ active: isFavorited, size })} />
      </button>
    </Tooltip>
  );
}

FavoriteArticleButton.defaultProps = {
  size: "md",
};

export default FavoriteArticleButton;
