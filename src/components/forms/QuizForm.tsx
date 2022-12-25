import { Button } from "@material-ui/core";
import axios, { AxiosError } from "axios";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
// import { title } from "process";
import { UseMutateAsyncFunction, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { errorMessages, successMessages } from "../../shared/constants";
import { IQuizForm } from "../../shared/interfaces";
import { AddEditQuizValidation } from "../../shared/validationSchema";
import { AddEditQuizFormFields } from "../AddEditQuizFormFields";


interface Props {
  mutateAsync: UseMutateAsyncFunction<any, AxiosError<any, any>, any, unknown>;
  reset: () => void;
  title?: string;
  description?: string;
  tags?: string[];
  redirect: string;
  id?: string;
  status?: string;
  quantity?:string; // new add here
  category?:string; // new
  check?: string; // new
  // create?: string;
  // generate?: string;
}


export const QuizForm: React.FC<Props> = ({
  mutateAsync,
  reset,
  description,
  tags,
  title,
  redirect,
  id,
  status,
  quantity, // new ad here
  category, // new
  check, // new
  // create,
  // generate,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  enum Options {
    "create",
    "generate",
  }
  return (
    <Formik<IQuizForm>
      initialValues={{
        selectedOption: Options.create.toString(),
        title: title || "",
        description: description || "",
        tags: tags || [],
        status: status || "",
        quantity: quantity || "", // new add here
        category: category || "", //new
        check: check || "", // new
        // generate: generate || "", //new
        // create: create || "", //new
      }}
      validationSchema={AddEditQuizValidation}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        setSubmitting(true);
        const body = { ...values };
        if (!id) delete body.status;
        try {
          if (!!!values.title.trim()) {
            setFieldError("title", "Only Spaces not allowed.");
            throw Error("Form Error");
          }
          if (!!!values.description.trim()) {
            setFieldError("description", "Only Spaces not allowed.");
            throw Error("Form Error");
          }
          if (!!!values.category.trim()) {
            setFieldError("title", "Only Spaces not allowed.");
            throw Error("Form Error");
          }
          if (!!!values.quantity.trim()) {
            setFieldError("title", "Only Spaces not allowed.");
            throw Error("Form Error");
          }
          
          await mutateAsync(
            { body },
            {
              onSuccess: () => {
                queryClient.invalidateQueries("Quizes");
                enqueueSnackbar(
                  successMessages.actionSuccess(
                    id ? "Updated" : "Created",
                    "Quiz"
                  )
                );
                id && queryClient.invalidateQueries(["Quiz", id]);
                navigate(redirect);
              },
              onError: () => {
                enqueueSnackbar(errorMessages.default);
              },
              onSettled: () => {
                reset();
                setSubmitting(false);
              },
            }
          );
        } catch (e) {}
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form className="pb-2" onSubmit={handleSubmit}>
          <div className="mx-10">
            <AddEditQuizFormFields id={id} />
            <div className="flex justify-end mt-4">
              <div className="mr-4">
                <Button onClick={() => navigate(-1)}>Cancel</Button>
              </div>

              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
