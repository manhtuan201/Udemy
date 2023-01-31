import { useEffect } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/hooks/use-http";
import { getSingleQuote } from "../lib/lib/api";

const QuoteDetail = () => {
  const {
    sendRequest,
    status,
    data: loadSingleQuote,
    error,
  } = useHttp(getSingleQuote, true);
  const { quoteId } = useParams();
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);
  const params = useParams();
  const match = useRouteMatch();
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <div className="centered">{error}</div>;
  }
  if (!loadSingleQuote.text) {
    return <div className="centered">No quotes found</div>;
  }
  return (
    <>
      <HighlightedQuote text={loadSingleQuote.text} author={loadSingleQuote.author} />
      {/* <Route path={match.path} exact> */}
      <div className="centered">
        <Link className="btn--flat" to={`${match.url}/comments`}>
          Loading comments...
        </Link>
      </div>
      {/* </Route> */}
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
};
export default QuoteDetail;
