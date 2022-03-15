export const fetchLesson = async (lessonId) => {
    const data = {
        lessonId: lessonId,
        pCourseTitle: 'English',
        pCourseId: 1,
        pLangTitle: 'Spanish',
        pLangId: 2,
        lessonName: '¡Yo hablo español!',
        board: [
            {
                type: 'MESSAGE',
                value: '<p>test</p>'
            }
        ]
    }
    return data
}