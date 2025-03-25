import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/usersSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../../shared/models/domain/Auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Inputs/Button";
import { Container } from "./styles";


const Login: React.FC = () => {

    const dispatch = useDispatch();
    
    const handleSubmit = (data: Auth) => {

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                localStorage.setItem("user", JSON.stringify(user));
                // console.log("user", user);
                dispatch(setUser({
                    id: user.uid,
                    email: user.email
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                }) as any);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage, {
                    toastId: "invalid-form-field",
                });
                console.log("Error: ", errorCode, errorMessage);
            });
    }

    const formik = useFormik({
        onSubmit: handleSubmit,
        // validationSchema: schema,
        // enableReinitialize: true,
        initialValues: {
            email: "",
            password: "",
        } as Auth,
    });

    // useEffect(() => {
    //     localStorage.getItem("user");
    // }, []);

    return (
        <Container>
            <div>
                <h1>
                    BG Limpo
                </h1>
            </div>
            <div>
                <h2>Login</h2>
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        placeholder="E-mail"
                    />
                    <Input
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder="Password"
                    />
                    <Button
                        type="submit"
                        btnTheme="primary"
                        // disabled={checkDisabledSubmit()}
                    >
                        Entrar
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default Login;