import gql from 'graphql-tag';

export const allData = gql`
  {
    allQuestion {
      edges {
        node {
          questionId
          isChoice
          questionText
          required
          position
          category {
            categoryId
            description
          }
          offeredAnswers {
            edges {
              node {
                offeredAnswerId
                answerText
                position
              }
            }
          }
        }
      }
    }
    allSchoolSubjects {
      edges {
        node {
          schoolSubjectId
          name
        }
      }
    }
    allTeacher {
      edges {
        node {
          teacherId
          name
        }
      }
    }
    allCourse {
      edges {
        node {
          courseId
          name
        }
      }
    }
  }
`;
