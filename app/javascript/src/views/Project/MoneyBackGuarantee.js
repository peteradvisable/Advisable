import React from "react";
import styled from "styled-components";
import { Box, Text } from "@advisable/donut";

const Badge = styled.div`
  color: white;
  position: relative;

  .hours,
  .label {
    width: 100%;
    text-align: center;
    position: absolute;
  }

  .hours {
    top: 10px;
    font-size: 18px;
    font-weight: 600;
  }

  .label {
    bottom: 12px;
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
  }

  svg {
    display: block;
  }
`;

export default function MoneyBackGuarantee() {
  return (
    <Box display="flex" alignItems="center">
      <Badge>
        <span className="hours">8</span>
        <span className="label">hour</span>
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <path
            d="M22.6786 1.28954C24.5305 -0.429845 27.4695 -0.429847 29.3214 1.28954L31.4812 3.29469C32.5402 4.27791 34.0127 4.73709 35.4716 4.53905L38.4469 4.13516C40.9982 3.78883 43.3759 5.44678 43.8211 7.88247L44.3403 10.723C44.5949 12.1158 45.505 13.318 46.8066 13.9808L49.461 15.3324C51.7371 16.4914 52.6454 19.174 51.5138 21.3957L50.1941 23.9866C49.547 25.257 49.547 26.743 50.1941 28.0134L51.5138 30.6043C52.6454 32.826 51.7371 35.5086 49.461 36.6676L46.8066 38.0192C45.505 38.682 44.5949 39.8842 44.3403 41.277L43.8211 44.1175C43.3759 46.5532 40.9982 48.2112 38.4469 47.8648L35.4716 47.461C34.0127 47.2629 32.5402 47.7221 31.4812 48.7053L29.3214 50.7105C27.4695 52.4298 24.5305 52.4298 22.6786 50.7105L20.5188 48.7053C19.4598 47.7221 17.9873 47.2629 16.5284 47.461L13.5531 47.8648C11.0018 48.2112 8.62405 46.5532 8.17886 44.1175L7.65968 41.277C7.4051 39.8842 6.49504 38.682 5.19344 38.0192L2.539 36.6676C0.262864 35.5086 -0.645353 32.826 0.486236 30.6043L1.8059 28.0134C2.45299 26.743 2.45299 25.257 1.8059 23.9866L0.486237 21.3957C-0.645353 19.174 0.262864 16.4914 2.539 15.3324L5.19344 13.9808C6.49503 13.318 7.4051 12.1158 7.65968 10.723L8.17886 7.88248C8.62405 5.44678 11.0018 3.78883 13.5531 4.13516L16.5284 4.53905C17.9873 4.73709 19.4598 4.27791 20.5188 3.29469L22.6786 1.28954Z"
            fill="#2DCBD0"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M42.2346 5.20168L13.6666 47.8494L13.5531 47.8648C11.0018 48.2112 8.62405 46.5532 8.17886 44.1175L7.65968 41.277C7.4051 39.8842 6.49504 38.682 5.19344 38.0192L2.539 36.6676C0.262864 35.5086 -0.645353 32.826 0.486236 30.6043L1.8059 28.0134C2.45299 26.743 2.45299 25.257 1.8059 23.9866L0.486237 21.3957C-0.645353 19.174 0.262864 16.4914 2.539 15.3324L5.19344 13.9808C6.49503 13.318 7.4051 12.1158 7.65968 10.723L8.17886 7.88248C8.62405 5.44678 11.0018 3.78883 13.5531 4.13516L16.5284 4.53905C17.9873 4.73709 19.4598 4.27791 20.5188 3.29469L22.6786 1.28954C24.5305 -0.429845 27.4695 -0.429847 29.3214 1.28954L31.4812 3.29469C32.5402 4.27791 34.0127 4.73709 35.4716 4.53905L38.4469 4.13516C39.8633 3.94289 41.2262 4.36835 42.2346 5.20168Z"
            fill="white"
            fill-opacity="0.12"
          />
        </svg>
      </Badge>
      <Box paddingLeft="16px">
        <Text
          fontSize="15px"
          marginBottom="4px"
          color="neutral900"
          fontWeight="medium"
        >
          Money back guarantee
        </Text>
        <Text fontSize="14px" color="neutral700" lineHeight="17px">
          Once you assign a task, if you’re not happy with the quality of the
          work, we’ll give you a 100% refund for up to 8 hours work.
        </Text>
      </Box>
    </Box>
  );
}
