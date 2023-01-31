import { useEffect } from "react";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/hooks/use-http";
import { getAllQuotes } from "../lib/lib/api";

const AllQuotes = () => {

  const {
    sendRequest,
    status,
    data: loadingQuote,
    error,
  } = useHttp(getAllQuotes,true);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className="centered focused">{error}</p>;
  }
  if (status === "completed" && (!loadingQuote || loadingQuote.length === 0)) {
    return <NoQuotesFound />;
  }

  return (
    <>
      <h1>All Quotes Page</h1>
      <QuoteList quotes={loadingQuote} />
    </>
  );
};
export default AllQuotes;
