import { useMemo } from "react";
import ReactModal from "react-modal";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { RiCloseFill } from "react-icons/ri";
import { MdCleaningServices } from "react-icons/md";
import { toast } from "react-toastify";
import { Game, GameCleaning } from "../../../shared/models/Games";
import { fetchGames, updateCleaningDate } from "../../../store/gamesSlice";
import Button from "../../../components/Inputs/Button";
import InputDate from "../../../components/Inputs/InputDate";
import schema from "./schema";
import InputSelectMulti from "../../../components/Inputs/InputSelectMulti";
import { MultiValue } from "react-select";
import { Dropdown } from "../../../shared/models/domain/Select";
import { getTypeDescription, getTypeList } from "../../../shared/enums/CleaningMethodEnum";
import Input from "../../../components/Inputs/Input";
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

  // const element = document.createElement("div");
  ReactModal.setAppElement('#root');
  const dispatch = useDispatch();

  const today = new Date().toISOString().split("T")[0];

  const methodOptions = useMemo(() => {
    return getTypeList().map((x) => {
      return {
        id: String(x.id),
        name: x.name,
      } as Dropdown
    }) as Dropdown[]
  }, []);

  const handleSubmit = (data: GameCleaning) => {
    console.log("data: ", data);
    if (data?.id) {
      dispatch(updateCleaningDate({
        id: data.id,
        methods: data.methods,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any).then(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dispatch(fetchGames() as any);
        toggleModal()
      });
    }
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: schema,
    enableReinitialize: true,
    initialValues: {
      ...gameEditing,
      cleaning_date: today,
      methods: null,
    } as GameCleaning,
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
        // appElement={element}
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
              <Input
                name="name"
                label="Nome"
                placeholder="Nome do jogo"
                value={formik?.values?.name}
                disabled
              />
              {/* <Input
                name="cleaning_method"
                label="Método de Limpeza *"
                placeholder="1.Sílica, 2.Sanol, 3.Banho de sol"
                value={formik?.values?.cleaning_method}
                onChange={formik?.handleChange}
                errorText={getErrorMessage("cleaning_method")}
                autoFocus
              /> */}
              <InputSelectMulti
                name="methods"
                id="methods"
                label="Métodos de Limpeza *"
                placeholder="Ex. Aplicação de Sílica, Sanol, Banho de Sol"
                onChange={(e: MultiValue<Dropdown>) => {
                  console.log(e.map(x => Number(x.id)));
                  formik.setFieldValue('methods', e.map(x => Number(x.id)));
                }}
                selecteds={
                  formik?.values?.methods?.map(x => {
                    return {
                      id: String(x),
                      name: getTypeDescription(x),
                    } as Dropdown
                  }) as Dropdown[]
                }
                options={methodOptions}
                errorText={getErrorMessage("methods")}
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
