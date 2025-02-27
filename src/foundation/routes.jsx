import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Entrance = lazy(() => import('../pages/entrance'));
const BlogHome = lazy(() => import('../pages/blog_home'));
const Entry = lazy(() => import('../pages/entry'));
const NotFound = lazy(() => import('../pages/not_found'));

export function Routes() {
  const error = useSelector((state) => state.error.toJS());

  if (error.error !== undefined) {
    return <NotFound />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Entrance} />
        <Route exact path="/:blogId" component={BlogHome} />
        <Route exact path="/:blogId/entry/:entryId" component={Entry} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Suspense>
  );
}
