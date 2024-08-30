export enum QuestionDifficulty {
    Easy = 0,
    Medium = 1,
    Hard = 2
}

export enum SkillLevel {
    Horrible = 1,
    lacking = 2,
    alright = 3,
    good = 4,
    perfect = 5
}

export interface ProblemInfoDTO {


    title: string,
    url: string,
    isCompleted: boolean,
    completionDate: Date,
    difficulty: QuestionDifficulty,
    skillLevel: SkillLevel,
    categoryName: string



};

export interface SubmitProblemRequestDTO { 
    problemName: string | undefined,
    categoryName: string | undefined,
    report: SkillLevel | undefined
};

export interface ProblemSetProgressResponseDTO { 
    data: Map< string, number >
}

