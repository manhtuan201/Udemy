import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/hooks/use-http";
import { addQuote } from "../lib/lib/api";

const NewQuote = () => {
  const history = useHistory();
  const { sendRequest, status } = useHttp(addQuote);
  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
    history.push("/quote");
  };
  useEffect(() => {
    if (status === "completed") {
      history.push("/quote");
    }
  }, [status, history]);
  return (
    <>
      <h1>New Quote Page</h1>
      <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
    </>
  );
};
export default NewQuote;
