import React, { useState } from 'react';
import { useField } from 'formik';
import { Article } from '../../../utils/dto/article';
import { InputGroup, Tag } from '@blueprintjs/core';

export const LinkedArticles: React.FC<{
  name: string;
  articles: Article[];
}> = ({ name, articles }) => {
  const [field, , helpers] = useField(name);
  const [searchValue, setSearchValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Article[]>();

  const handleRemoveTag = (id: string) => {
    const newArray = [...field.value];
    const indexToRemove = newArray.findIndex((item) => item === id);
    newArray.splice(indexToRemove, 1);
    helpers.setValue(newArray);
  };

  const handleAddTag = (id: string) => {
    if (field.value.indexOf(id) === -1) {
      helpers.setValue([...field.value, id]);
    }

    setSearchValue('');
  };

  const handleSearchChange = (text: string) => {
    setSearchValue(text);
    setSuggestions(
      articles.filter(
        (article) =>
          article.title.toLowerCase().indexOf(text.toLowerCase()) > -1
      )
    );
  };

  return (
    <div className="edit__form__select_articles">
      <InputGroup
        value={searchValue}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      {searchValue.length > 0 && (
        <div className="edit__form__suggest">
          {suggestions?.length && suggestions?.length > 0 ? (
            suggestions.map((article) => (
              <p
                key={article.slug}
                onClick={() => handleAddTag(article._id)}
                className="edit__form__suggest_item"
              >
                {article.title}
              </p>
            ))
          ) : (
            <p className="edit__form__suggest_item">No matches</p>
          )}
        </div>
      )}
      <div className="edit__form__tags">
        {articles
          .filter((item) => field.value.indexOf(item._id) !== -1)
          .map((item) => {
            if (field.value.indexOf(item._id) === -1) {
              return;
            }
            return (
              <Tag
                key={item._id}
                onRemove={() => handleRemoveTag(item._id)}
                className="edit__form__tag"
                large
              >
                {item.title}
              </Tag>
            );
          })}
      </div>
    </div>
  );
};
