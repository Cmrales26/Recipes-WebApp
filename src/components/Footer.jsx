import { useNavigate } from "react-router-dom";
import imagotipo from "../../public/images/Imagotipo.svg";
function Footer() {
  const Navigate = useNavigate();
  return (
    <section id="Footer">
      <div className="Imagotipo">
        <img
          onClick={() => Navigate("/home")}
          src={imagotipo}
          alt=" imagotipo"
          width={40}
        />
        <p>Recipes WebApp</p>
      </div>
      <div className="FooterRight">
        <hr />
        <p>
          &copy; Todos los derechos reservados &nbsp;
          <a href="https://github.com/Cmrales26" target="_blank">
            Cmrales26
          </a>
        </p>
      </div>
    </section>
  );
}

export default Footer;
