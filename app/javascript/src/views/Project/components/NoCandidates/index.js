import React from "react";
import illustration from './illustration';
import Text from "src/components/Text";
import Spacing from "src/components/Spacing";
import { Card } from "./styles";

export default ({ text }) => (
  <Card>
    <Spacing bottom="xl">
      <img src={illustration} width={300} alt='' />
    </Spacing>
    <Text weight="semibold" colour='dark'>{text}</Text>
  </Card>
);
