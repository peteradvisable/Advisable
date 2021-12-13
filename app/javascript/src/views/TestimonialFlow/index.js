import React, { Suspense } from "react";
import { useReviewMeta } from "./queries";
import { Route, useParams, Switch } from "react-router-dom";
import { Box, Container } from "@advisable/donut";
import NotFound, { isNotFound } from "src/views/NotFound";
import Loading from "src/components/Loading";
import Logo from "src/components/Logo";
// Review views
import ReviewComment from "./views/ReviewComment";
import ReviewRatings from "./views/ReviewRatings";
import ReviewComplete from "./views/ReviewComplete";
import ReviewIntro from "./views/ReviewIntro";

export default function TestimonialFlow() {
  const params = useParams();
  const { id } = params;
  const { data, loading, error } = useReviewMeta(id);
  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  return (
    <Suspense fallback={<Loading />}>
      <Box textAlign="center" py="40px">
        <Logo />
      </Box>
      <Container maxWidth="700px" pb="20px">
        <Switch>
          <Route path="/review/:id/ratings">
            <ReviewRatings data={data} />
          </Route>
          <Route path="/review/:id/comment">
            <ReviewComment data={data} />
          </Route>
          <Route path="/review/:id/complete">
            <ReviewComplete data={data} />
          </Route>
          <Route>
            <ReviewIntro data={data} />
          </Route>
        </Switch>
      </Container>
    </Suspense>
  );
}
