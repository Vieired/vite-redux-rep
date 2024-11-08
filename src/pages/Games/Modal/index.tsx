import ReactModal from "react-modal";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { useFormik } from "formik";
// import ReactModal from "react-modal";
// import { SingleValue } from "react-select";
import { RiCloseFill } from "react-icons/ri";
// import { toast } from "react-toastify";
import { Game } from "../../../shared/models/Games";
import { createGame, updateGame } from "../../../store/gamesSlice";
import Button from "../../../components/Inputs/Button";
import Input from "../../../components/Inputs/Input";
import InputDate from "../../../components/Inputs/InputDate";
import schema from "./schema";
import {
  Container,
  ModalContent,
  ModalHeader,
  ModalBody,
  Buttons,
  ModalFooter,
} from "./styles";

interface Props {
    gameEditing: Game | null;
    // refreshList: () => void;
    modalOpen: boolean;
    toggleModal: () => void;
    clearGameEditing: () => void;
}

const Modal: React.FC<Props> = ({
  gameEditing,
  // refreshList,
  modalOpen,
  toggleModal,
  clearGameEditing,
}) => {

  const element = document.createElement("div");
  const dispatch = useDispatch();

  const today = new Date().toISOString().split("T")[0];

//   const done = () => {
//     toggleModal();
//     refreshList();
//   };

  const handleSubmit = (data: Game) => {
    // gameEditing ? edit(data, done) : save(data, done);
    if(gameEditing?.id) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(updateGame(data) as any).then(() => {
        toggleModal()
      })
    }
    else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(createGame(data) as any).then(() => {
        toggleModal()
      })
    }
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: schema,
    enableReinitialize: true,
    initialValues: gameEditing?.id
      ? (gameEditing as Game)
      : {
        cleaning_date: today,
        cleaning_method: 1,
        isActive: true,
        name: ""
      } as Game,
  });

  const getErrorMessage = (fieldName: string) => {
    if (formik.isSubmitting && !formik.isValid) {
    //   toast.error("Check required fields.", {
    //     toastId: "invalid-form-field",
    //   });
    }

    return formik?.getFieldMeta(fieldName)?.touched &&
      formik?.getFieldMeta(fieldName)?.error
      ? formik.getFieldMeta(fieldName).error
      : "";
  };

  const handleAfterClose = () => {
    formik.resetForm();
    clearGameEditing();
  };

//   useEffect(() => {
//     if (formik?.values?.province) setCityOptions(formik?.values?.province.id);
//   }, [formik?.values?.province]);

  return (
    <Container>
      <ReactModal
        isOpen={modalOpen}
        contentLabel={gameEditing ? "Editar Jogo" : "Criar Jogo"}
        appElement={element}
        onRequestClose={toggleModal}
        onAfterClose={handleAfterClose}
        style={{
          content: {
            top: "50%",
            left: "50%",
            padding: "0",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            height: "80%",
          },
        }}
      >
        <ModalContent>
          <ModalHeader>
            <h1>{gameEditing ? "Editar Jogo" : "Criar Jogo"}</h1>
            <button type="button" onClick={toggleModal}>
              <RiCloseFill />
            </button>
          </ModalHeader>
          <ModalBody>
            <form
              id="hookform"
              onSubmit={formik.handleSubmit}
            //   className={getLoadingState() ? "loading" : ""}
            >
                {/* {`Editando: ${gameEditing?.name || "N/A"}`} */}
                <Input
                    name="name"
                    label="Nome *"
                    placeholder="Nome do jogo"
                    value={formik?.values?.name}
                    onChange={formik?.handleChange}
                    errorText={getErrorMessage("name")}
                    autoFocus
                />
                <InputDate
                    name="cleaning_date"
                    label="Data da Limpeza *"
                    value={formik?.values?.cleaning_date}
                    onChange={formik?.handleChange}
                    errorText={getErrorMessage("cleaning_date")}
                />
                <Input
                    name="photoUrl"
                    label="URL da foto"
                    placeholder="Ex. https://google/storage/imagem.jpg"
                    value={formik?.values?.photoUrl}
                    onChange={formik?.handleChange}
                    errorText={getErrorMessage("photoUrl")}
                />
            </form>
          </ModalBody>
          <ModalFooter>
            <Buttons>
              <Button onClick={toggleModal} btnTheme="secondary">
                Cancelar
              </Button>
              <Button
                type="submit"
                btnTheme="primary"
                form="hookform"
                // disabled={getLoadingState()}
              >
                Salvar
              </Button>
            </Buttons>
          </ModalFooter>
        </ModalContent>
      </ReactModal>
    </Container>
  );
};

export default Modal;
