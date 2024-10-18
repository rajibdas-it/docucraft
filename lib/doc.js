import fs from 'fs'
import path from 'path'
import matter from 'gray-matter' //.md file er content ke parse korar jonno ei package dorkar
import { remark } from 'remark'
import html from "remark-html"

const postDirectory = path.join(process.cwd(), "docs")//shudhu docs folder eer path ta dibe

export function getDoucments() {
    //console.log(postDirectory);
    const fileNames = fs.readdirSync(postDirectory) //folder e thaka file gular namer ekta array pawa jay
    // console.log(fileNames);
    const allDocuments = fileNames.map((fileName) => {
        // console.log(fileName); //analysis.md
        const id = fileName.replace(".md", "") //file name ke .md badh diye banay nilam jeta url er jonno kaj korbe
        // console.log(id); //analysis

        const fullPath = path.join(postDirectory, fileName)
        // console.log(fullPath);

        const fileContents = fs.readFileSync(fullPath, "utf8") //file er vitore read korar jonno
        // console.log(fileContents);

        const metterResult = matter(fileContents)
        // console.log("only title", metterResult.data.title);

        return {
            id,
            ...metterResult.data
        }

    })
    //return with sorting accroding to order number
    return allDocuments.sort((a, b) => {
        if (a.order < b.order) {
            return -1
        }
        if (a.order > b.order) {
            return 1
        }
        return 0
    })
}


export async function getDoucmentContent(id) {
    const fullPath = path.join(postDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const processedContent = await remark().use(html).process(matterResult.content)
    const contentHtml = processedContent.toString()
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}
