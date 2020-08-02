import React from "react";
import { createPortal } from "react-dom";
import { FixedSizeList as List } from "react-window";
import { motion } from "framer-motion";
import { Box } from "@advisable/donut";
import Text from "../../Text";
import { Menu as MenuStyles, StyledMenuContainer } from "../styles";
import MenuItem from "../MenuItem";
import filterItems from "../filterItems";
import getPortalTarget from "../portralTarget";

const Menu = ({
  popper,
  width,
  listRef,
  options,
  downshift,
  max,
  isMax,
  formatLabel,
}) => {
  if (!downshift.isOpen) return null;

  let portalRoot = getPortalTarget();
  const { getItemProps, highlightedIndex, selected } = downshift;

  let items = filterItems(downshift, options);
  let listHeight = items.length < 7 ? items.length * 36 : 224;

  return createPortal(
    <StyledMenuContainer
      ref={popper.ref}
      style={{ ...popper.style, width }}
      data-placement={popper.placement}
    >
      <MenuStyles {...downshift.getMenuProps()}>
        {isMax ? (
          <Box padding="m">
            <Text color="neutral.N5" size="xs" css="text-align: center;">
              You can not add more than {max} items
            </Text>
          </Box>
        ) : (
          <List
            width={width}
            ref={listRef}
            itemCount={items.length}
            height={listHeight}
            itemSize={36}
            itemData={{
              items,
              getItemProps,
              highlightedIndex,
              selected,
              formatLabel,
            }}
          >
            {MenuItem}
          </List>
        )}
      </MenuStyles>
    </StyledMenuContainer>,
    portalRoot,
  );
};

export default Menu;
