"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  getDocsByAuthor,
  getDocsByCategory,
  getDocsByTag,
} from "@/utils/doc-util";

const Sidebar = ({ docs }) => {
  const pathName = usePathname();
  const [roots, setRoots] = useState([]);
  const [nonRoots, setNonRoot] = useState({});

  useEffect(() => {
    let matchedDocs = docs;
    // console.log(matchedDocs);
    if (pathName.includes("/tags")) {
      const tag = pathName.split("/")[2];
      matchedDocs = getDocsByTag(docs, tag);
    } else if (pathName.includes("/author")) {
      const author = pathName.split("/")[2];
      matchedDocs = getDocsByAuthor(docs, author);
    } else if (pathName.includes("/categories")) {
      const category = pathName.split("/")[2];
      matchedDocs = getDocsByCategory(docs, category);
    }

    const rootsNode = matchedDocs.filter((doc) => !doc.parent); //jar parent null segulai return korbe
    const nonRootsNode = Object.groupBy(
      matchedDocs.filter((doc) => doc.parent),
      ({ parent }) => parent
    );

    const nonRootsKeys = Reflect.ownKeys(nonRootsNode);
    // console.log(nonRootsKeys);
    nonRootsKeys.forEach((key) => {
      const foundInRoots = rootsNode.find((root) => root.id === key);
      if (!foundInRoots) {
        const foundInDocs = docs.find((doc) => doc.id === key);
        rootsNode.push(foundInDocs);
      }
    });

    rootsNode.sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    setRoots([...rootsNode]);
    setNonRoot({ ...nonRootsNode });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);
  // console.log(pathName);
  // console.log(docs);
  // const roots = docs.filter((doc) => doc.parent === null);
  // const roots = matchedDocs.filter((doc) => !doc.parent); //jar parent null segulai return korbe

  // // const nonRoots = Object.groupBy(
  // //   docs.filter((doc) => doc.parent), //ki filter hobe.
  // //   (doc) => doc.parent
  // // );

  // //upor er ta r eita same khali eikahne 2nd parameter e parent ke destructure kore nise
  // const nonRoots = Object.groupBy(
  //   matchedDocs.filter((doc) => doc.parent),
  //   ({ parent }) => parent
  // );

  // console.log(nonRoots["introduction"]);

  // console.log(nonRoots);

  return (
    <div>
      <nav className="lg:block my-10">
        <ul>
          <div className="relative mt-3 pl-2">
            <div className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"></div>
            <div className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"></div>
            <div className="absolute left-2 h-6 w-px bg-emerald-500"></div>
            <ul role="list" className="border-l border-transparent">
              {roots.map((rootNode) => (
                <li key={rootNode.id} className="relative">
                  <Link
                    aria-current="page"
                    className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
                    href={`/docs/${rootNode.id}`}
                  >
                    <span className="truncate">{rootNode.title}</span>
                  </Link>
                  {nonRoots[rootNode.id] && (
                    <ul role="list" className="border-l border-transparent">
                      {nonRoots[rootNode.id].map((subRoot) => (
                        <li key={subRoot.id}>
                          <Link
                            aria-current="page"
                            className="flex justify-between gap-2 py-1 pl-7 pr-3 text-sm text-zinc-900 transition dark:text-white"
                            href={`/docs/${rootNode.id}/${subRoot.id}`}
                          >
                            <span className="truncate">{subRoot.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
