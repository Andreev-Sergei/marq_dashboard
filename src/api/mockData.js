/* UPPERCASE constants is endpoint data */

const shortCourse = {
    id: 1,
    symbol: "🇹🇷",
    title: "Turkish",
    total: 12,
}

// 'api_v1/course-list'
const SHORT_COURSES_LIST = [shortCourse,]

const shortLesson = {
    id: 1,
    title: "¡Hola, amigo!",
    symbol: "",
    review: true
}

const SHORT_COURSE_LANGUAGE = {
    id: 1,
    title: "English",
    symbol: "🇬🇧",
    lessons: [shortLesson,]
}

// 'api_v1/course/:id'
const FULL_COURSE = {
    courseId: 1,
    title: "Spanish",
    symbol: "🇪🇸",
    languages: [SHORT_COURSE_LANGUAGE,]
}


// 'api_v1/course/language/:id'
const FULL_COURSE_LANGUAGE = {
    id: 1,
    langTitle: 'English course',
    courseName: 'Spanish',
    descriptionMain: 'Start from scratch',
    descriptionSecondary: 'If you\'re just trying to learn a language',
    FlagsEmoji: '🇬🇧',
    secretTitle: 'eng-esp',
    FinishedCourse: true
}


const CHAT_MASSAGE_ITEM = {
    id: 1,
    type: 'MESSAGE',
    value: 'Hello! It is <voice>test</voice> massage', // just for react
    words: [
        {type: 1, value: 'Hello!'},
        {type: 1, value: 'It!'},
        {type: 1, value: 'is'},
        {type: 3, value: 'test'},
        {type: 1, value: 'massage'}
    ]
}

const CHAT_TASK_ITEM = {
    id: 1,
    type: 'TASK',
    words: [
        {isAnswer: false, value: 'Собака'},
        {isAnswer: false, value: '-'},
        {isAnswer: true, value: 'dog'}, // right word
    ],
    options: [
        {isAnswer: true, value: 'dog'},
        {isAnswer: false, value: 'cat'},
        {isAnswer: false, value: 'cow'},
        {isAnswer: false, value: 'cow'},
    ]

}

const SHORT_LESSON = {
    id: 1,
    lessonName: '¡Yo hablo español!',
    descriptionMain: 'Greetings & farewells',
    descriptionSecondary: 'If you\'re just trying to learn a language',
    FlagsEmoji: '🇬🇧',
    secretTitle: 'eng-esp',
}

// 'api_v1/lesson/:id'
// 'api_v1/course-list/1?lang=1&&lesson=1
const FULL_LESSON = {
    id: 1,
    lessonName: '¡Yo hablo español!',
    CourseTitle: 'English',
    CourseId: 1,
    LangTitle: 'Spanish',
    LangId: 2,
    board: [CHAT_MASSAGE_ITEM, CHAT_TASK_ITEM,]
}