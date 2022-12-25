import { QuizForm } from "../components/forms/QuizForm";
import { useCreateQuiz, useGenerateQuiz } from "../shared/queries";
import { useUser } from '@clerk/clerk-react';
import { useMutation } from "react-query";
import {endpoints} from '../shared/urls'
import axios from "axios";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
interface Props { }

export const CreateQuiz: React.FC<Props> = () => {
  const { mutateAsync: mutateAsync, reset } = useCreateQuiz();
  const { mutateAsync: generateMutate } = useGenerateQuiz();
  const { publicMetadata,id } = useUser();
  const navigate = useNavigate();
  return (
    <div>
      {(publicMetadata.role === "student") ?
        <>
          <h2 className="text-2xl font-medium text-center">Generate a Quiz</h2>
          <div className="mx-auto md:w-6/12 mt-10">
            {/* <GenerateQuiz
              redirect="/dashboard"
              mutateAsync={generateMutate}
              reset={reset}
              author={id}
            /> */}
            <QuizForm
              redirect="/dashboard"
              mutateAsync={mutateAsync}
              reset={reset}
            />
          </div>
        </>
        :
        <>
          <h2 className="text-2xl font-medium text-center mt-5">Create / Generate a Quiz</h2>
          <div className="mx-auto md:w-6/12 mt-10">
            <QuizForm
              redirect="/dashboard"
              mutateAsync={mutateAsync}
              reset={reset}
            />
          </div>
        </>
      }
    </div>
  );
};
