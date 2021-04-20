import React from "react";
import * as Sentry from "@sentry/react";
import { Pin } from "@styled-icons/ionicons-solid/Pin";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Box, Text, Avatar, Link, Notice } from "@advisable/donut";
import Topics from "./components/Topics";
import Markdown from "../Markdown";
import PostTypeTag from "@guild/components/PostTypeTag";
import PostActions from "@guild/components/PostActions";
import { CoverImage } from "@guild/components/CoverImage";
import ConnectionsCount from "@guild/components/ConnectionsCount";
import ResolvedNotice from "./components/ResolvedNotice";
import { guildPostUrl, isGuildPath } from "@guild/utils";
import { StyledPostCard } from "./styles";
import useViewerAuthor from "@guild/hooks/useViewerAuthor";
import PopularNotice from "./components/PopularNotice";

const Post = ({
  post,
  showEdit = false,
  showShare = false,
  showDelete = false,
  showResolve = false,
  walkthrough = false,
}) => {
  const history = useHistory();
  const url = guildPostUrl(post.id);
  const { popularOrAuthorReactions } = useViewerAuthor(post);

  const handleOpen = () => {
    // We need to use an actual page load while the guild pack is separate.
    isGuildPath ? history.push(url) : (window.location = url);
  };
  const LinkOrExternal = isGuildPath ? RouterLink : Link.External;

  return (
    <Sentry.ErrorBoundary>
      <StyledPostCard
        padding={[4, 6]}
        data-testid="post"
        pinned={post.pinned}
        popular={popularOrAuthorReactions}
      >
        <Box position="absolute" right="2" top="2">
          <PostTypeTag post={post} />
        </Box>

        <Box display="flex" marginBottom="5" alignItems="center">
          <Avatar
            as={RouterLink}
            to={`/freelancers/${post.author.id}/guild`}
            size="s"
            name={post.author.name}
            url={post.author.avatar}
          />
          <Box ml="3">
            <Link
              mb={0.5}
              variant="dark"
              fontSize={["m", "l"]}
              color="neutral900"
              letterSpacing="-0.01rem"
              to={`/freelancers/${post.author.id}/guild`}
            >
              {post.author.name}
            </Link>
            <Text fontSize="xs" letterSpacing="-0.01rem" color="neutral600">
              {post.createdAtTimeAgo} ago
            </Text>
          </Box>
        </Box>

        {post.coverImage && (
          <Box mb="6">
            <a href={`/guild/posts/${post.id}`}>
              <CoverImage
                height={{ _: "200px", s: "320px" }}
                cover={post.coverImage.url}
              />
            </a>
          </Box>
        )}

        <Text
          pb={4}
          display="block"
          fontSize={["2xl", "4xl"]}
          color="neutral900"
          fontWeight="medium"
          letterSpacing="-0.03rem"
          as={LinkOrExternal}
          to={url}
          href={url}
        >
          {post.title}
        </Text>

        <>
          <Box mb={6} onClick={handleOpen} style={{ cursor: "pointer" }}>
            <Markdown>{post.excerpt}</Markdown>
          </Box>

          <Text
            mb={6}
            display="inline-block"
            color="blue700"
            as={LinkOrExternal}
            href={url}
            to={url}
          >
            Read more
          </Text>

          {post.resolved ? (
            <ResolvedNotice authorName={post.author.firstName} />
          ) : (
            <Box display="flex" alignItems="center" marginBottom={5}>
              <PostActions
                mr={3}
                post={post}
                showEdit={showEdit}
                showShare={showShare}
                showDelete={showDelete}
                showResolve={showResolve}
                walkthrough={walkthrough}
              />
              <ConnectionsCount post={post} />
            </Box>
          )}
        </>

        <Topics walkthrough={walkthrough} topics={post.guildTopics} />

        {post.pinned && (
          <Notice mt={4} icon={<Pin />} padding={3} variant="orange">
            This post has been pinned by the Advisable team
          </Notice>
        )}

        {popularOrAuthorReactions && (
          <PopularNotice
            post={post}
            marginTop="8"
            marginBottom={["-18px", "-30px"]}
          />
        )}
      </StyledPostCard>
    </Sentry.ErrorBoundary>
  );
};

export default Post;
