/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard/ArticleCard";
import "./ArticleCards.css";

import mock_article_1_picture from "../../../assets/mock_article_1_picture.png";

interface Article {
  date: string;
  url: string;
  sourceName: string;
  isTechNews: boolean;
  isAnnouncement: boolean;
  isDigest: boolean;
  title: string;
  content: string;
  wordCount: number;
  picture: string;
}

interface ArticleCardsProps {
  documentsData: any[];
}

const ArticleCards: React.FC<ArticleCardsProps> = ({ documentsData }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [displayedArticles, setDisplayedArticles] = useState(2);

  useEffect(() => {
    if (documentsData && Array.isArray(documentsData)) {
      const transformedArticles = documentsData.map((doc: any) => ({
        date: new Date(doc.ok.issueDate).toLocaleDateString("ru-RU"),
        url: doc.ok.url,
        sourceName: doc.ok.source.name,
        isTechNews: doc.ok.attributes.isTechNews,
        isAnnouncement: doc.ok.attributes.isAnnouncement,
        isDigest: doc.ok.attributes.isDigest,
        title: doc.ok.title.text,
        content: doc.ok.content.markup,
        wordCount: doc.ok.attributes.wordCount,
        picture: mock_article_1_picture,
      }));

      setArticles(transformedArticles);
    }
  }, [documentsData]);

  // Функция для загрузки больше статей
  const showMoreArticles = () => {
    setDisplayedArticles((prev) => prev + 2); // Показывать на две статьи больше
  };

  return (
    <div className="article-cards-block">
      <h2 className="h2-search-results-page-articles">Список документов</h2>
      <div className="article-cards">
        {articles.slice(0, displayedArticles).map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
      {displayedArticles < articles.length && (
        <div className="button-div">
          <button className="button show-more" onClick={showMoreArticles}>
            Показать больше
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleCards;
