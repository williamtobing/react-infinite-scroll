"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const pageLength = 5;

export default function Home() {
  const [photoData, setPhotoData] = useState([] as Photo[]);
  const [endIndex, setEndIndex] = useState(pageLength);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((data) => {
        setPhotoData(data);
        setIsFetching(false);
      });
  }, []);

  const handleLoadMore = () => {
    setTimeout(() => {
      setEndIndex((prevEndIndex) => prevEndIndex + pageLength);
    }, 1500);
  };

  return (
    <main className="my-2">
      <div className="max-w-lg mx-auto">
        {isFetching ? (
          <p className="text-center">Fetching Data...</p>
        ) : (
          <InfiniteScroll
            dataLength={endIndex}
            next={handleLoadMore}
            hasMore={endIndex <= photoData.length}
            loader={<p className="text-center">Loading...</p>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div className="space-y-2">
              {photoData.slice(0, endIndex).map((item) => (
                <React.Fragment key={item.id}>
                  {item.url && (
                    <div className="p-1 border rounded">
                      <Image
                        src={item.url}
                        width={600}
                        height={600}
                        alt="gallery image"
                      />
                      <p className="text-center">{item.url}</p>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </main>
  );
}
