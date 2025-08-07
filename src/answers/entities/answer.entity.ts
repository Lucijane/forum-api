import { Answers } from "@prisma/client";
import { Question } from "src/questions/entities/question.entity";
import { User } from "src/user/entity/user.entity";


export class Answer implements Answers {

    id: number;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    questionId: number;
    user: User;
    question: Question;
}
