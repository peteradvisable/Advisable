import reduce from "lodash/reduce";
import moment from "moment-timezone";
import { Link } from 'react-router-dom';
import React, { Component, Fragment } from "react";
import Text from "src/components/Text";
import Heading from "src/components/Heading";
import { Day, ContactUS } from './styles';

const SelectDay = ({ clientName, availability, timeZone, match }) => {
  const dates = reduce(
    availability,
    (collection, datetime) => {
      const parsed = moment.tz(datetime, timeZone).format("YYYY-MM-DD");
      if (collection.indexOf(parsed) === -1) {
        return [...collection, parsed];
      }
      return collection;
    },
    []
  );

  return (
    <Fragment>
      <Heading size="l" marginBottom="xs">Call with {clientName}</Heading>
      <Text marginBottom="xl">
        {clientName} has requested a call with you! Please select an available
        day below.
      </Text>
      {dates.map(d => {
        const date = moment.tz(d, timeZone)
        return (
          <Day key={d} to={`${match.url}/${d}`}>
            <h4>{date.format("dddd")}</h4>
            <span>{date.format('DD MMMM YYYY')}</span>
            <svg width={10} height={18} fill="none">
              <path d="M1 17l8-8-8-8" stroke="#929DC1" />
            </svg>
          </Day>
        );
      })}
      <Text size="s" marginTop='xl'>None of these dates work for you?</Text>
      <ContactUS href='mailto:hello@advisable.com'>Contact us</ContactUS>
    </Fragment>
  );
};

export default SelectDay;
