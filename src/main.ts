// 固定値
const prop = PropertiesService.getScriptProperties().getProperties()
const APP_ACCESS_TOKEN = prop.APP_ACCESS_TOKEN
const USER_ACCESS_TOKEN = prop.USER_ACCESS_TOKEN

/**
 * TODO 最新版を最古版にする
 */

const _postMessage = (
  channelId: string,
  emoji: string,
  text: string,
  blocks?: any
) => {
  const url = 'https://slack.com/api/chat.postMessage'

  const payload = blocks
    ? {
        channel: channelId,
        username: 'threadman',
        icon_emoji: emoji,
        text,
        unfurl_links: true,
        attachments: [
          {
            blocks: blocks,
          },
        ],
      }
    : {
        channel: channelId,
        username: 'threadman',
        icon_emoji: emoji,
        text,
        unfurl_links: true,
      }

  const params = {
    method: 'post',
    contentType: 'application/json; charset=utf-8',
    headers: {
      Authorization: `Bearer ${APP_ACCESS_TOKEN}`,
    },
    payload: JSON.stringify(payload),
  }

  try {
    const result = JSON.parse(
      UrlFetchApp.fetch(
        url,
        // @ts-ignore
        params
      ).getContentText()
    )

    console.log(`📣: post message result`)
    console.log(result)

    console.log(`📣: payload`)
    console.log(payload)

    return result
  } catch (e) {
    console.error(`🙅: post message error`)
    // @ts-ignore
    console.error(e)

    throw `${url}へのリクエストに失敗しました`
  }
}

const _updateMessage = (
  channelId: string,
  ts: string,
  text: string,
  blocks?: any
) => {
  const url = 'https://slack.com/api/chat.update'

  const payload = blocks
    ? {
        channel: channelId,
        ts,
        text,
        unfurl_links: true,
        attachments: [
          {
            blocks: blocks,
          },
        ],
      }
    : {
        channel: channelId,
        ts,
        text,
        unfurl_links: true,
      }

  const params = {
    method: 'post',
    contentType: 'application/json; charset=utf-8',
    headers: {
      Authorization: `Bearer ${APP_ACCESS_TOKEN}`,
    },
    payload: JSON.stringify(payload),
    text,
  }

  try {
    const result = JSON.parse(
      UrlFetchApp.fetch(
        url,
        // @ts-ignore
        params
      ).getContentText()
    )

    console.log(`📣: update message result`)
    console.log(result)

    return result
  } catch (e) {
    console.error(`🙅: update message error`)
    // @ts-ignore
    console.error(e)

    throw `${url}へのリクエストに失敗しました`
  }
}

const _deleteMessage = (channelId: string, ts: string) => {
  const url = 'https://slack.com/api/chat.delete'

  const payload = {
    channel: channelId,
    ts,
  }

  const params = {
    method: 'post',
    contentType: 'application/json; charset=utf-8',
    headers: {
      Authorization: `Bearer ${APP_ACCESS_TOKEN}`,
    },
    payload: JSON.stringify(payload),
  }

  try {
    const result = JSON.parse(
      UrlFetchApp.fetch(
        url,
        // @ts-ignore
        params
      ).getContentText()
    )

    console.log(`📣: delete message result`)
    console.log(result)

    return result
  } catch (e) {
    console.error(`🙅: delete message error`)
    // @ts-ignore
    console.error(e)

    throw `${url}へのリクエストに失敗しました`
  }
}

const _searchMessage = (query: string) => {
  const url = 'https://slack.com/api/search.messages'

  const payload = {
    token: USER_ACCESS_TOKEN,
    query,
  }

  const params = {
    method: 'get',
    contentType: 'application/x-www-form-urlencoded',
    payload,
  }

  try {
    const result = JSON.parse(
      UrlFetchApp.fetch(
        url,
        // @ts-ignore
        params
      ).getContentText()
    )

    console.log(`📣: search message result`)
    console.log(result)

    return result
  } catch (e) {
    console.error(`🙅: search message error`)
    // @ts-ignore
    console.error(e)

    throw `${url}へのリクエストに失敗しました`
  }
}
const _getUserInfo = (userId: string) => {
  const url = 'https://slack.com/api/users.info'

  const payload = {
    token: USER_ACCESS_TOKEN,
    user: userId,
  }

  const params = {
    method: 'get',
    contentType: 'application/x-www-form-urlencoded',
    payload,
  }

  try {
    const result = JSON.parse(
      UrlFetchApp.fetch(
        url,
        // @ts-ignore
        params
      ).getContentText()
    )

    console.log(`📣: user info result`)
    console.log(result)

    return result
  } catch (e) {
    console.error(`🙅: user info error`)
    // @ts-ignore
    console.error(e)

    throw `${url}へのリクエストに失敗しました`
  }
}
const _getPermalink = (channelId: string, ts: string) => {
  const url = 'https://slack.com/api/chat.getPermalink'

  const payload = {
    token: APP_ACCESS_TOKEN,
    channel: channelId,
    message_ts: ts,
  }

  const params = {
    method: 'get',
    contentType: 'application/x-www-form-urlencoded',
    payload,
  }

  try {
    const result = JSON.parse(
      UrlFetchApp.fetch(
        url,
        // @ts-ignore
        params
      ).getContentText()
    )

    console.log(`📣: permalink result`)
    console.log(result)

    return result
  } catch (e) {
    console.error(`🙅: permalink error`)
    // @ts-ignore
    console.error(e)

    throw `${url}へのリクエストに失敗しました`
  }
}
const _getConversationChannel = (userId: string) => {
  const url = 'https://slack.com/api/conversations.open'

  const payload = {
    token: APP_ACCESS_TOKEN,
    users: userId,
  }

  const params = {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    payload,
  }

  try {
    const result = JSON.parse(
      UrlFetchApp.fetch(
        url,
        // @ts-ignore
        params
      ).getContentText()
    )

    console.log(`📣: conversations result`)
    console.log(result)

    return result
  } catch (e) {
    console.error(`🙅: conversations error`)
    // @ts-ignore
    console.error(e)

    throw `${url}へのリクエストに失敗しました`
  }
}

export const doPost = (e: any) => {
  /**
   * スラッシュコマンド実行時
   */
  if (
    'parameter' in e &&
    'command' in e.parameter &&
    e.parameter.command === '/threadman'
  ) {
    console.log(`📣: /threadman`)
    const params = e.parameter
    const { text, user_id } = params

    console.log(`📣: params`)
    console.log(params)

    // 入力を分解
    const input = text.split(' ')

    // 空値
    if (input.length === 0) {
      return ContentService.createTextOutput('不正な入力値です')
    }

    // 不正値
    if (!['add', 'remove'].includes(input[0])) {
      return ContentService.createTextOutput('不正なコマンドです')
    }

    /** ===========================
     *  絵文字の登録
     =========================== */

    // 不正値
    if (input[0] === 'add' && input.length !== 2) {
      return ContentService.createTextOutput(
        '不正な入力です。addの後にスペースを空けて、転送に使用したい絵文字を入力してください'
      )
    }

    // 絵文字の登路
    if (input[0] === 'add' && input.length === 2) {
      const emoji = input[1]
      if (!emoji.match(/:[^"]+:/)) {
        return ContentService.createTextOutput(`不正な絵文字です`)
      }

      const channel = _getConversationChannel(user_id)
      if (!channel) return

      // 絵文字の登録
      _postMessage(
        channel.channel.id,
        emoji,
        `「<@${user_id}>」が「${emoji}」を押したメッセージを転送します\n※使用できるようになるまで数分かかります`
      )
      return ContentService.createTextOutput(``)
    }

    /** ===========================
     *  絵文字の削除
     =========================== */

    // 不正値
    if (input[0] === 'remove' && input.length !== 2) {
      return ContentService.createTextOutput(
        '不正な入力です。removeの後にスペースを空けて、転送を中止したい絵文字を入力してください'
      )
    }

    // 転送の中止
    if (input[0] === 'remove') {
      // TODO: user_idを指定して検索できない為 名前で検索
      const userName = _getUserInfo(user_id).user.profile.display_name

      const emoji = input[1]
      if (!emoji.match(/:[^"]+:/)) {
        return ContentService.createTextOutput(`不正な絵文字です`)
      }

      const result = _searchMessage(
        `「@${userName}」が「${emoji}」を押したメッセージを転送します from:@threadman`
      )

      const messages = result.messages.matches
      console.log(`📣: messages`)
      console.log(messages)

      if (!messages || messages.length === 0) {
        return ContentService.createTextOutput(
          `中止する転送用絵文字がありませんでした`
        )
      }

      console.log(`📣: messages[0]`)
      console.log(messages[0])

      const channelId = messages[0].channel.id
      const ts = messages[0].ts

      console.log(`📣: channelId`)
      console.log(channelId)

      // メッセージ自体削除
      _deleteMessage(channelId, ts)

      return ContentService.createTextOutput(`メッセージの転送を中止しました`)
    }

    //
    return ContentService.createTextOutput(`Error: minako-phへ連絡してください`)
  }

  /**
   * DONEボタン押した時
   */
  if (
    'parameter' in e &&
    'payload' in e.parameter &&
    JSON.parse(e.parameter.payload).type === 'block_actions'
  ) {
    // jsonを生成
    let payload
    try {
      payload = JSON.parse(e.parameter.payload)
    } catch (ex) {
      console.log(`🙅‍: payload json parse error`)
      console.log(ex)
      return
    }

    console.log(`📣: block_actions`)

    console.log(`📣: payload`)
    console.log(payload)

    // ボタンを押されたメッセージを削除
    const chanelId = payload.container.channel_id
    const ts = payload.container.message_ts
    _deleteMessage(chanelId, ts)
    return

    // 開発中：元のメッセージをスレッドに残す
  }

  console.log(`📣: e.postData`)
  console.log(e.postData)

  // jsonを生成
  let json
  try {
    json = JSON.parse(e.postData.getDataAsString())
  } catch (ex) {
    console.log(`🙅‍: postData json parse error`)
    console.log(ex)
    return
  }

  /**
   * Event API Verification時
   */
  if (json.type == 'url_verification') {
    return ContentService.createTextOutput(json.challenge)
  }

  // 作成したアプリからのリクエストでなければ終了
  // if (json.token !== APP_VERIFICATION_TOKEN) return
  const eventType = json.event.type

  /**
   * 絵文字追加時
   */
  if (eventType === 'reaction_added') {
    console.log(`📣: reaction_added`)

    console.log(`📣: event`)
    console.log(json.event)

    const userId = json.event.user
    const emojiStr = json.event.reaction

    // TODO: user_idを指定して検索できない為 名前で検索
    const userName = _getUserInfo(userId).user.profile.display_name

    const emojiRes = _searchMessage(
      `「@${userName}」が「:${emojiStr}:」を押したメッセージを転送します from:@threadman`
    )

    const messages = emojiRes.messages.matches
    console.log(`📣: messages`)
    console.log(messages)

    if (!messages || messages.length === 0) {
      return
    }

    // 転送するメッセージのパーマリンクを取得
    const chanelId = json.event.item.channel
    const ts = json.event.item.ts
    const { permalink } = _getPermalink(chanelId, ts)

    const channel = _getConversationChannel(userId)
    if (!channel) return

    // メッセージの転送
    _postMessage(channel.channel.id, emojiStr, permalink, [
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'DONEにする',
              emoji: true,
            },
            value: `${chanelId}-${ts}`,
            action_id: 'done_btn',
          },
        ],
      },
    ])
    return
  }

  /**
   * 絵文字削除時
   */
  if (eventType === 'reaction_removed') {
    console.log(`📣: reaction_removed`)
  }
}

export const main = () => {}
