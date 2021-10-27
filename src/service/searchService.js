import axios from "axios"

export const getWikiSearch = async (searchParam) => {
    const result = await axios.get(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${searchParam}&origin=*`)
    let data = []
    if (result.data.length === 4 && result.data[1] instanceof Array) {
        data = result.data[1].map((title, index) => ({
            title,
            url: result.data[3][index]
        }))
    }

    return {
        data,
        currentPage: 0,
        totalPages: 0
    }

}

export const hackNewsSearch = async (searchParam, page) => {
    const result = await axios.get(`https://hn.algolia.com/api/v1/search?query=${searchParam}&page=${page}`)

    const countPromise = []


    const data = result.data.hits.map(each => {
        countPromise.push(axios.get(`https://hn.algolia.com/api/v1/users/${each.author}`))
        return {
            author: each.author,
            title: each.title,
            submission_count: 0,
            url: each.url
        }
    })
    const userDetails = await Promise.all(countPromise)
    if (userDetails) {
        console.log(userDetails)
        userDetails.forEach((userDetail, index) => {
            data[index].submission_count = userDetail.data.submission_count
        })
    }
    return {
        data,
        currentPage: result.data.page,
        totalPages: result.data.nbPages - 1
    }
}