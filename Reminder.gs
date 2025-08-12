function reminder() {
  // 操作するスプレッドシートとシートを指定
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('フォームの回答 1');
  
  // シートが見つからない場合は処理を終了
  if (!sheet) {
    Logger.log('「フォームの回答 1」シートが見つかりませんでした。');
    return;
  }
  
  // シートが見つからない場合は処理を終了
  if (!sheet) {
    Logger.log('「フォームの回答 1」シートが見つかりませんでした。');
    return;
  }
  
  // データが入力されている最終行の番号を取得
  const lastRow = sheet.getLastRow();
  
  // 最終行のB列（メールアドレス）とE列（次にやること）の値を取得
  const email = sheet.getRange(lastRow, 2).getValue();      // 2番目の列 = B列
  const next_task = sheet.getRange(lastRow, 5).getValue(); // 5番目の列 = E列
  
  // メールアドレスと「次にやること」が両方入力されている場合のみメールを送信
  if (email && next_task) {
    // メールの件名と本文を定義
    const subject = '【リマインド】今日やる内容はこちら！';
    const body = `本日のタスクをお知らせします。\n\n▼次にやること\n「${next_task}」\n\n今日も頑張ろう。`;
    
    // メールを送信
    GmailApp.sendEmail(email, subject, body);
    
    // ログに記録
    Logger.log(`リマインドメールを ${email} 宛に送信しました。タスク: ${next_task}`);
  } else {
    // どちらかが空だった場合のログ
    Logger.log('最終行のメールアドレスまたは「次にやること」が空のため、メールは送信されませんでした。');
  }
}
