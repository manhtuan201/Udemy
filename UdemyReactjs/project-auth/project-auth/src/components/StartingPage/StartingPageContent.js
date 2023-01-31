import CreateForm from '../Form/CreateForm';
import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {
  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
      <CreateForm/>
    </section>
  );
};

export default StartingPageContent;
