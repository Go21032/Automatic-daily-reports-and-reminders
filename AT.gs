function sendDailyReportForm() {
  // 操作するスプレッドシートとシートを指定
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('フォームの回答 1');
  
  // シートが見つからない場合は処理を終了
  if (!sheet) {
    Logger.log('「フォームの回答 1」シートが見つかりませんでした。');
    return;
  }
  
  // B列の2行目から一番下まで、すべてのデータを取得
  // B1はヘッダー（メールアドレス）なので除外
  const range = sheet.getRange('B2:B' + sheet.getLastRow());
  const emailAddresses = range.getValues();
  
  // GoogleフォームのURL
  const formURL = 'https://docs.google.com/forms/d/e/1FAIpQLSc-T5-xXxVXnZPTZmtoa3qtX9NV36LHCbT25dZU2v6lQ4jJzw/viewform?usp=dialog';

  // メールの件名と本文を定義
  const subject = '【日報】本日の業務報告をお願いいたします';
  const body = `本日もお疲れ様です。\n\nお手数ですが、以下URLより本日の業務日報の提出をお願いいたします。\n\n▼日報アンケートはこちら\n${formURL}\n\nよろしくお願いいたします。`;
  
  // 送信済みアドレスを記録するための配列
  const sentEmails = [];

  // B列から取得したアドレスを1つずつ処理
  for (let i = 0; i < emailAddresses.length; i++) {
    const email = emailAddresses[i][0];
    
    // アドレスが空でない、かつ、まだ送信していないアドレスの場合のみ送信
    if (email && sentEmails.indexOf(email) === -1) {
      GmailApp.sendEmail(email, subject, body);
      sentEmails.push(email); // 送信済みリストに追加
      Logger.log(email + ' にメールを送信しました。'); // ログに記録
    }
  }
}
