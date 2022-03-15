const courses = [
    {
        symbol: "🇹🇷",
        title: "Turkish",
        total: 12,
        id: 1
    }, {
        symbol: "🇪🇸",
        title: "Spanish",
        total: 10,
        id: 2
    }, {
        symbol: "🇬🇧",
        title: "English",
        total: 23,
        id: 3
    }, {
        symbol: "🇵🇱",
        title: "Poland",
        total: 7,
        id: 4
    },
]
const course = {
    courseId: 1,
    title: "Spanish",
    symbol: "🇪🇸",
    languages: [
        {
            id: 1,
            title: "English",
            symbol: "🇬🇧",
            lessons: [
                {
                    id: 1,
                    title: "¡Hola, amigo!",
                    symbol: "",
                    review: true
                },
                {
                    id: 2,
                    title: "¡Yo hablo español!",
                    symbol: ""
                },
                {
                    id: 3,
                    title: "Soy de los Estados Unidos",
                    symbol: ""
                },
                {
                    id: 4,
                    title: "No comprendo",
                    symbol: ""
                },
                {
                    id: 5,
                    title: "No como carne",
                    symbol: ""
                },
            ]
        },
        {
            id: 2,
            title: "Spanish",
            symbol: "🇪🇸",
            lessons: [
                {
                    id: 134,
                    title: "¡Hola, amigo!",
                    symbol: "🇪🇸",
                    review: true
                },
                {
                    id: 2324,
                    title: "¡Yo hablo español!",
                    symbol: "🇪🇸"
                },
                {
                    id: 2343,
                    title: "Soy de los Estados Unidos",
                    symbol: "🇪🇸"
                },
                {
                    id: 3244,
                    title: "No comprendo",
                    symbol: "🇪🇸"
                },

            ]
        },
    ]
}

export const fetchCourseList = async () => {
    const data = courses
    return data
}


export const fetchCourse = async (courseId) => {
    const data = course
    return data
}

export const fetchLangItem = async (langId) => {
    const data = [{
        id: 1,
        langTitle: 'English course',
        courseName: 'Spanish',
        descriptionMain: 'Start from scratch',
        descriptionSecondary: 'If you\'re just trying to learn a language',
        FlagsEmoji: '🇬🇧',
        secretTitle: 'eng-esp',
        FinishedCourse: true
    }, {
        id: 2,
        langTitle: 'Spanish course',
        courseName: 'Spanish',
        descriptionMain: 'Start from scratch',
        descriptionSecondary: 'If you\'re just trying to learn a language',
        FlagsEmoji: '🇪🇸',
        secretTitle: 'eng-esp',
        FinishedCourse: false
    }]
    return data.find(x=> x.id === langId)
}