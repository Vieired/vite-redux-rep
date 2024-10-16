import Video from "../../components/Video";
import SideBar from "../../components/SideBar";
import { Container } from "./styles";


const Learn: React.FC = () => {

    return (
        <Container>    
            <h2>Sala de Aprendizado</h2>
            <Video />
            <SideBar />
        </Container>
    );
};

export default Learn;