import React, { useRef } from "react";
import { DateTime } from "luxon";
import { format, addDays, isSameMonth, isSameDay, parseISO } from "date-fns";
import { VariableSizeList as List } from "react-window";
import useComponentSize from "@rehooks/component-size";
import {
  StyledAvailability,
  StyledAvailabilityScrollContainer,
} from "./styles";
import Box from "../Box";
import Text from "../Text";
import AvailabilityDay from "./AvailabilityDay";
import AvailabilityModal from "./AvailabilityModal";

const Availability = ({ value }) => {
  const ref = useRef(null);
  const size = useComponentSize(ref);
  const [selectedDay, selectDay] = React.useState(null);
  const [month, setMonth] = React.useState(DateTime.local().startOf("month"));

  // We use react-window to render a large list of scrolling records. This
  // needs to be told how wide each item is. The first item is a spacer item
  // and should be 20px wide. Each day is 50px width with 4px spacing so we
  // return 54px.
  const getItemSize = index => {
    if (index === 0) return 20;
    return 54;
  };

  const handleItemsRendered = item => {
    const date = DateTime.local().plus({ days: item.visibleStartIndex });
    if (!month.hasSame(date, "month")) {
      setMonth(date.startOf("month"));
    }
  };

  const handleClickItem = day => {
    selectDay(day);
  };

  const availabilityForDate = date => {
    if (date === null) return [];
    return value.filter(v => {
      return DateTime.fromISO(v).hasSame(date, "day");
    });
  };

  return (
    <StyledAvailability ref={ref}>
      <AvailabilityModal
        selectedDay={selectedDay}
        initialAvailability={availabilityForDate(selectedDay)}
      />
      <Text ml="20px" mb="s" fontSize="l" fontWeight="semibold">
        {month.toFormat("MMMM yyyy")}
      </Text>
      <List
        height={90}
        itemCount={367} // we render 365 days to the future
        layout="horizontal"
        itemSize={getItemSize}
        innerElementType={StyledAvailabilityScrollContainer}
        onItemsRendered={handleItemsRendered}
        width={size.width}
      >
        {item => {
          // If its the first item then we are rendering the 20px spacer.
          if (item.index === 0) {
            return <Box style={item.style} />;
          }

          const date = DateTime.local().plus({ days: item.index });

          return (
            <AvailabilityDay
              date={date}
              onClick={handleClickItem}
              availability={availabilityForDate(date)}
              {...item}
            />
          );
        }}
      </List>
    </StyledAvailability>
  );
};

export default Availability;
