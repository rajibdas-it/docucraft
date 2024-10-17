import fs from 'fs'
import path from 'path'
import matter from 'gray-matter' //.md file er content ke parse korar jonno ei package dorkar

const pathDirectory = path.join(process.cwd(), "docs")//shudhu docs folder eer path ta dibe


export function getDoucments() {
    //console.log(pathDirectory);
    const fileNames = fs.readdirSync(pathDirectory) //folder e thaka file gular namer ekta array pawa jay
    // console.log(fileNames);
    const allDocuments = fileNames.map((fileName) => {
        // console.log(fileName); //analysis.md
        const id = fileName.replace(".md", "") //file name ke .md badh diye banay nilam jeta url er jonno kaj korbe
        // console.log(id); //analysis

        const fullPath = path.join(pathDirectory, fileName)
        // console.log(fullPath);

        const fileContents = fs.readFileSync(fullPath, "utf-8") //file er vitore read korar jonno
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

