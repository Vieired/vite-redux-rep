
import { connect } from "react-redux";
import { Lesson, Module, Video } from "../../shared/models/Video";
import { Container } from "./styles";

// const SideBar = ({ modules }) => (
//     <Container>
//         <h3>Lista</h3>
//         <aside>
//             {modules?.map((module) => (
//                 <div key={module.id}>
//                     <strong>{module.title}</strong>
//                     <ul>
//                         {module?.lessons?.map((lesson) => (
//                             <li key={lesson.id}>{lesson.title}</li>
//                         ))}
//                     </ul>
//                 </div>
//             ))}
//         </aside>
//     </Container>
// );
// export default connect((state) => ({ modules: state.modules }))(SideBar);


// const SideBar = ({ modules }) => (
//     <Container>
//         <h3>Lista</h3>
//         <aside>
//             {modules?.map((module: Module) => (
//                 <div key={module.id}>
//                     <strong>{module.title}</strong>
//                     <ul>
//                         {module?.lessons?.map((lesson:Lesson) => (
//                             <li key={lesson.id}>{lesson.title}</li>
//                         ))}
//                     </ul>
//                 </div>
//             ))}
//         </aside>
//     </Container>
// );
// export default connect((state: Video) => ({ modules: state.modules } as Video))(SideBar);

const SideBar: React.FC = () => {
    return (
        <Container>
            <h3>Lista</h3>
            <aside>
                {modules?.map((module: Module) => (
                    <div key={module.id}>
                        <strong>{module.title}</strong>
                        <ul>
                            {module?.lessons?.map((lesson:Lesson) => (
                                <li key={lesson.id}>{lesson.title}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </aside>
        </Container>
    );
};

export default connect((state: Video) => ({ modules: state.modules }))(SideBar);

// const SideBar: React.FC<Video> = ({ modules }) => {
//     return (
//         <Container>
//             <h3>Lista</h3>
//             <aside>
//                 {modules?.map((module: Module) => (
//                     <div key={module.id}>
//                         <strong>{module.title}</strong>
//                         <ul>
//                             {module?.lessons?.map((lesson:Lesson) => (
//                                 <li key={lesson.id}>{lesson.title}</li>
//                             ))}
//                         </ul>
//                     </div>
//                 ))}
//             </aside>
//         </Container>
//     );
// };

// export default connect((state: Video) => ({ modules: state.modules }))(SideBar);


// export default connect((state: Video) => ({ modules: state.modules }))(
//     ({ modules }) => {
//         return (
//             <Container>
//                 <h3>Lista</h3>
//                 <aside>
//                     {modules.map((module: Module) => (
//                         <div key={module.id}>
//                             <strong>{module.title}</strong>
//                             <ul>
//                                 {module?.lessons?.map((lesson:Lesson) => (
//                                     <li key={lesson.id}>{lesson.title}</li>
//                                 ))}
//                             </ul>
//                         </div>
//                     ))}
//                 </aside>
//             </Container>
//         );
//     };
// );