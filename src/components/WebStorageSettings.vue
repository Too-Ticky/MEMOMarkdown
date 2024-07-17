<template>
  <h1 class="error-txt break-keep msg-ja">ご利用のブラウザは,<wbr />Webストレージの利用が制限されているため、<wbr />各種設定や状態の保存ができません。</h1>
  <div class="howto-settings msg-ja " >
  <!-- v-if="!isLocalStorageEnable || !isSessionStorageEnable"> -->
    <h2>ローカル/セッションストレージの設定の確認と変更方法</h2>
    <p>&nbsp;</p>
      <h3><span class="pink msg-ja">Google Chrome</span></h3>  
        <ol>
          <li>Chromeの[設定]を開く</li>
          <li>[プライバシーとセキュリティ]タブを開く</li>
          <li>[サードパーティ Cookie]を開く</li>
          <li>[サードパーティの Cookie を許可する]にチェックを入れる<br>
              <small>(ChromeではCookieとWebストレージの許可を個別に設定することはできません)</small></li>
          <li>このステップでうまくいかない場合はChromeを再起動してください。</li>
        </ol>
        <p>&nbsp;</p>
      <h3><span class="pink msg-ja">Microsoft Edge</span></h3>
        <ol>
          <li>[設定]を開く</li>
          <li>[Cookie とサイトのアクセス許可]タブを開く</li>
          <li>[Cookie とサイト データの管理と削除]を開く</li>
          <li>[Cookie データの保存と読み取りをサイトに許可する (推奨)]をONにする<br>
              <small>(EdgeではCookieとWebストレージの許可を個別に設定することはできません)</small></li>
          <li>このステップでうまくいかない場合はEdgeやWindows(PC)を再起動してください。</li>
        </ol>
    <p>&nbsp;</p>
  </div>
</template>

<style scoped>
  h1 {
    text-align: center;
    font-size: 1.25rem;
  }
  h2 {
    text-align: left;
    font-size: 1.25rem;
  }
  h3 {
    margin-left: 1rem;
    margin-bottom: 1rem;
    text-align: left;
    font-size: 1.25rem;
  }
  ol {
    margin-left: 3rem;
    text-align: left;
    list-style-type: decimal;
    list-style-position: outside;
  }
  li {
    font-size: 1rem;
  }
  span {
    display: inline-block;
  }
  
  .break-keep {
    word-break: keep-all;
  }
  .howto-settings {
    display: block;
    padding: 1rem;
    max-width: 43rem;
    margin: auto;
  }
  .error-txt {
    padding: 2rem;
    color: red;
  }
  .pink {
    color: pink;
  }
  .msg-ja {}
  .msg-en {}

</style>
