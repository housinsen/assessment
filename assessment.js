'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て除去する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) {
    // 子どもの要素があるかぎり除去
    element.removeChild(element.firstChild);
  }
}

assessmentButton.onclick = () => {
  const ぴえん = userNameInput.value;
  if (ぴえん.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }

  // 診断結果表示エリアの作成
  removeAllChildren(resultDivided);
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(ぴえん);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // ツイートエリアの作成
  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたのいいところ') +
    '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのいいところ';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};

const answers = [
  '{ぴえん}のいいところは声です。{ぴえん}の特徴的な声はみなを惹きつけ、心に残ります。',
  '{ぴえん}のいいところはまなざしです。{ぴえん}に見つめられた人は、気になって仕方がないでしょう。',
  '{ぴえん}のいいところは情熱です。{ぴえん}の情熱に周りの人は感化されます。',
  '{ぴえん}のいいところは厳しさです。{ぴえん}の厳しさがものごとをいつも成功に導きます。',
  '{ぴえん}のいいところは知識です。博識な{ぴえん}を多くの人が頼りにしています。',
  '{ぴえん}のいいところはユニークさです。{ぴえん}だけのその特徴が皆を楽しくさせます。',
  '{ぴえん}のいいところは用心深さです。{ぴえん}の洞察に、多くの人が助けられます。',
  '{ぴえん}のいいところは見た目です。内側から溢れ出る{ぴえん}の良さに皆が気を惹かれます。',
  '{ぴえん}のいいところは決断力です。{ぴえん}がする決断にいつも助けられる人がいます。',
  '{ぴえん}のいいところは思いやりです。{ぴえん}に気をかけてもらった多くの人が感謝しています。',
  '{ぴえん}のいいところは感受性です。{ぴえん}が感じたことに皆が共感し、わかりあうことができます。',
  '{ぴえん}のいいところは節度です。強引すぎない{ぴえん}の考えに皆が感謝しています。',
  '{ぴえん}のいいところは好奇心です。新しいことに向かっていく{ぴえん}の心構えが多くの人に魅力的に映ります。',
  '{ぴえん}のいいところは気配りです。{ぴえん}の配慮が多くの人を救っています。',
  '{ぴえん}のいいところはその全てです。ありのままの{ぴえん}自身がいいところなのです。',
  '{ぴえん}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{ぴえん}が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} ぴえん ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(ぴえん) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < ぴえん.length; i++) {
    sumOfCharCode = sumOfCharCode + ぴえん.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replace(/{ぴえん}/g, ぴえん);
  return result;
}

// テストコード
console.assert(
  assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
      assessmentButton.onclick();
    }
  };