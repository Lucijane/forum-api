import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class QuestionsService {

  @Inject()
  private readonly prisma: PrismaService;

  async create(createQuestionDto: CreateQuestionDto, req: any) {
    console.log(req.sub);
    return await this.prisma.questions.create({
      data: { ...createQuestionDto, userId: req.sub.sub },
    })
  }

  async findAll() {
    return await this.prisma.questions.findMany({
      include: {
        answers: true, user: {
          select: {
            name: true,
            email: true // Include user details
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.questions.findUnique({
      where: { id }, include: {
        answers: true, user: {
          select: {
            name: true,
            email: true
          }
        }, // Include user details
      },
    });
  }
  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const userId = 1;
    return await this.prisma.questions.update({
      where: { id },
      data: { userId }
    })
  }

  async remove(id: number) {
    return await this.prisma.questions.delete({ where: { id } });
  }
}
