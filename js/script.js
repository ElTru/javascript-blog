'use strict';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [Done] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
}

const optArticleSelector = '.post', // zawartośc artykułu
  optTitleSelector = '.post-title', // tytuły artykułów w poście
  optTitleListSelector = '.titles'; // tytuły artykułów jako linki w linście

function generateTitleLinks(){
  /* [DONE] remove contents of titleList */ // wywalić lini z lewej kolumny
  const titleList = document.querySelector(optTitleListSelector); // znajduje linki i wrzucam pustaka ''
  titleList.innerHTML = '';

  /* [IN PROGRESS] for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';
  for(let article of articles){
    const articleId = article.getAttribute('id'); // get the article id
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;   // find the title element
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'; //get the title from the title element // create HTML of the link
    html = html + linkHTML;  // insert link html variable
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();
