// CSS
import styles from './GlobalFooter.module.css';
// TODO This footer is actively blocking content access
function GlobalFooter() {
  return (
    <footer>
      Favicon courtesy of <a href="https://icons8.com/">icons8</a>
      {/* <a href="https://www.freepik.com/photos/pearl-tea">
            <br />
            Pearl tea photo created by tawatchai07 - www.freepik.com
          </a> */}
      <br />
      Eatt &copy;2022 Justin Henley
    </footer>
  );
}

export default GlobalFooter;
