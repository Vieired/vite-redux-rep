import ReactModal from "react-modal";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { RiCloseFill } from "react-icons/ri";
import { MdCleaningServices } from "react-icons/md";
import { toast } from "react-toastify";
import { Game } from "../../../shared/models/Games";
import { fetchGames, updateCleaningDate } from "../../../store/gamesSlice";
import Button from "../../../components/Inputs/Button";
import InputDate from "../../../components/Inputs/InputDate";
import Input from "../../../components/Inputs/Input";
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
    modalOpen: boolean;
    toggleModal: () => void;
    clearGameEditing: () => void;
}

const ModalCleaning: React.FC<Props> = ({
  gameEditing,
  modalOpen,
  toggleModal,
  clearGameEditing,
}) => {

  const element = document.createElement("div");
  const dispatch = useDispatch();

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (data: Game) => {
    dispatch(updateCleaningDate({
      id: data.id,
      cleaning_method: Number(data.cleaning_method),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any).then(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(fetchGames() as any);
      toggleModal()
    });
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: schema,
    enableReinitialize: true,
    initialValues: {
      ...gameEditing,
      cleaning_date: today,
    } as Game,
  });

  const getErrorMessage = (fieldName: string) => {
    if (formik.isSubmitting && !formik.isValid) {
      toast.error("Check required fields.", {
        toastId: "invalid-form-field",
      });
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

  return (
    <Container>
      <ReactModal
        isOpen={modalOpen}
        contentLabel="Limpar Jogo"
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
            <h1>Limpar Jogo</h1>
            <button type="button" onClick={toggleModal}>
              <RiCloseFill />
            </button>
          </ModalHeader>
          <ModalBody>
            <form
              id="hookform"
              onSubmit={formik.handleSubmit}
              // className={getLoadingState() ? "loading" : ""}
            >
              {/* <input
                type="number"
                name="cleaning_method"
                placeholder="1.Sílica, 2.Sanol, 3.Banho de sol"
                value={formik?.values?.cleaning_method}
                onChange={formik?.handleChange}
                autoFocus
              /> */}
              <Input
                name="cleaning_method"
                label="Método de Limpeza *"
                placeholder="1.Sílica, 2.Sanol, 3.Banho de sol"
                value={formik?.values?.cleaning_method}
                onChange={formik?.handleChange}
                errorText={getErrorMessage("cleaning_method")}
                autoFocus
              />
              <InputDate
                name="cleaning_date"
                label="Data da Limpeza *"
                value={formik?.values?.cleaning_date}
                onChange={formik?.handleChange}
                errorText={getErrorMessage("cleaning_date")}
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
                <span>Limpar</span><MdCleaningServices />
              </Button>
            </Buttons>
          </ModalFooter>
        </ModalContent>
      </ReactModal>
    </Container>
  );
};

export default ModalCleaning;
