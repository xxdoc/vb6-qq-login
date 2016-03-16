VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
  Persistable = 0  'NotPersistable
  DataBindingBehavior = 0  'vbNone
  DataSourceBehavior  = 0  'vbNone
  MTSTransactionMode  = 0  'NotAnMTSObject
END
Attribute VB_Name = "QQService"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = True
Attribute VB_PredeclaredId = False
Attribute VB_Exposed = False
Option Explicit
'//////////////////////////////////////////////////////////////////////////////
'@@summary
'@@require
'@@reference
'@@license
'@@author
'@@create
'@@modify
'//////////////////////////////////////////////////////////////////////////////


'//////////////////////////////////////////////////////////////////////////////
'//
'//      公有声明
'//
'//////////////////////////////////////////////////////////////////////////////


'------------------------------------------------------------------------------
'       接口继承
'------------------------------------------------------------------------------


'------------------------------------------------------------------------------
'       公有常量
'------------------------------------------------------------------------------


'------------------------------------------------------------------------------
'       公有数据类型
'------------------------------------------------------------------------------


'------------------------------------------------------------------------------
'       公有变量
'------------------------------------------------------------------------------


'------------------------------------------------------------------------------
'       公有API
'------------------------------------------------------------------------------


'------------------------------------------------------------------------------
'       事件声明
'------------------------------------------------------------------------------


'//////////////////////////////////////////////////////////////////////////////
'//
'//      私有声明
'//
'//////////////////////////////////////////////////////////////////////////////


'------------------------------------------------------------------------------
'       私有常量
'------------------------------------------------------------------------------


'------------------------------------------------------------------------------
'       私有数据类型
'------------------------------------------------------------------------------


'------------------------------------------------------------------------------
'       私有变量
'------------------------------------------------------------------------------
  Private responseBody As String
  Private responseHeaders As String
  Private WinHttp As WinHttp.WinHttpRequest
  Private fileOpr As New cFile
  Private jsExec As New ScriptControl
  Private lastCookies As String
  Private cookieMng As New VB_Cookie
  
  '第一步，预先获得
  Private uin As String
  Private password As String
  Private clientid As String
  '一级登录获得
  Private ptwebqq As String
  Private skey As String
  '二级登录获得的数据
  Private psessionid As String
  Private vfwebqq As String
  
'------------------------------------------------------------------------------
'       属性变量
'------------------------------------------------------------------------------
Public Property Get QQ() As String
  QQ = uin
End Property

Public Property Let QQ(ByVal QQ As String)
  uin = QQ
End Property

'------------------------------------------------------------------------------
'       私有API
'------------------------------------------------------------------------------


'//////////////////////////////////////////////////////////////////////////////
'//
'//      类
'//
'//////////////////////////////////////////////////////////////////////////////


'------------------------------------------------------------------------------
'       初始化
'------------------------------------------------------------------------------
Private Sub Class_Initialize()    '
    Set WinHttp = CreateObject("WinHttp.WinHttpRequest.5.1")
    jsExec.Language = "JavaScript"
End Sub


'------------------------------------------------------------------------------
'       销毁
'------------------------------------------------------------------------------
Private Sub Class_Terminate()
  Set WinHttp = Nothing
End Sub


'//////////////////////////////////////////////////////////////////////////////
'//
'//      事件处理
'//
'//////////////////////////////////////////////////////////////////////////////


'//////////////////////////////////////////////////////////////////////////////
'//
'//      私有属性
'//
'//////////////////////////////////////////////////////////////////////////////


'//////////////////////////////////////////////////////////////////////////////
'//
'//      私有方法
'//
'//////////////////////////////////////////////////////////////////////////////
Private Function BytesToBstr(strBody, CodeBase) '编码转换("UTF-8"或者"GB2312"或者"GBK")
  Dim ObjStream
  Set ObjStream = CreateObject("Adodb.Stream")
  With ObjStream
    .Type = 1
    .Mode = 3
    .Open
    .Write strBody
    .Position = 0
    .Type = 2
    .Charset = CodeBase
    BytesToBstr = .ReadText
    .Close
  End With
  Set ObjStream = Nothing
End Function

Public Function UrlEncode(ByVal strParameter As String) As String
  Dim s As String
  Dim I As Integer
  Dim intValue As Integer
  Dim TmpData() As Byte

  s = ""
  TmpData = StrConv(strParameter, vbFromUnicode)
  For I = 0 To UBound(TmpData)
    intValue = TmpData(I)
    If (intValue >= 48 And intValue <= 57) Or _
      (intValue >= 65 And intValue <= 90) Or _
      (intValue >= 97 And intValue <= 122) Then
      s = s & Chr(intValue)
    ElseIf intValue = 32 Then
      s = s & "+"
    Else
      s = s & "%" & Hex(intValue)
    End If
  Next I
  UrlEncode = s
End Function
'//////////////////////////////////////////////////////////////////////////////
'//
'//      继承实现
'//
'//////////////////////////////////////////////////////////////////////////////


'//////////////////////////////////////////////////////////////////////////////
'//
'//      公有属性
'//
'//////////////////////////////////////////////////////////////////////////////


'//////////////////////////////////////////////////////////////////////////////
'//
'//      公有方法
'//
'//////////////////////////////////////////////////////////////////////////////
Public Function Login(ByVal QQ As String, ByVal password As String, ByRef pictureBox As pictureBox) As Boolean
  On Error GoTo errProcess
  Dim WinHttp As WinHttp.WinHttpRequest '声明一个对象
  
  Dim Verify_Code_Url As String
  Dim Login_Url As String
  
  Dim VerifySession As String
  Dim VerifyCode As String
  Dim Salt As String
  Dim tmpArr() As String
  Dim jsCode As String
  
  Dim user As String
  Dim pass As String
  
  'step 3
  Dim r As String
  Dim json As Variant
  
  uin = QQ
  Set WinHttp = CreateObject("WinHttp.WinHttpRequest.5.1")
  'get client id

  WinHttp.Open "GET", "http://pub.idqqimg.com/smartqq/js/mq.js", True
  WinHttp.SetTimeouts 30000, 30000, 30000, 30000
  WinHttp.SetRequestHeader "Host", "pub.idqqimg.com"
  WinHttp.SetRequestHeader "Connection", "keep-alive"
  WinHttp.SetRequestHeader "Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
  WinHttp.SetRequestHeader "User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36"
  WinHttp.SetRequestHeader "Accept-Language", "zh-CN,zh;q=0.8"
  WinHttp.Send            '发送
  WinHttp.WaitForResponse '异步发送
  responseBody = BytesToBstr(WinHttp.responseBody, "UTF-8")
  responseHeaders = WinHttp.GetAllResponseHeaders
  'get clientid
  clientid = Split(Split(responseBody, "setValidate({clientid:")(1), ",")(0)
  'load cookies to mem
  cookieMng.AddCookiesFromHeaders responseHeaders
  lastCookies = cookieMng.getCookieOfDomain("ptlogin2.qq.com")
  'https://ssl.ptlogin2.qq.com/check?pt_tea=1&uin=[QQNumber]&appid=501004106&js_ver=10034&js_type=0&login_sig=&u1=http%3A%2F%2Fw.qq.com%2Fproxy.html&r=0.23477151861080792
  '【第一步：检测验证码】
  Verify_Code_Url = "https://ssl.ptlogin2.qq.com/check?pt_tea=1&uin=[QQNumber]&appid=501004106&js_ver=10034&js_type=0&login_sig=&u1=http%3A%2F%2Fw.qq.com%2Fproxy.html&r=0.23477151861080792"
  Verify_Code_Url = Replace(Verify_Code_Url, "[QQNumber]", QQ)
  WinHttp.Open "GET", Verify_Code_Url, True
  WinHttp.SetTimeouts 30000, 30000, 30000, 30000
  WinHttp.SetRequestHeader "Host", "ssl.ptlogin2.qq.com"
  WinHttp.SetRequestHeader "Connection", "keep-alive"
  WinHttp.SetRequestHeader "Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
  WinHttp.SetRequestHeader "User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36"
  WinHttp.SetRequestHeader "Accept-Language", "zh-CN,zh;q=0.8"
  WinHttp.Send            '发送
  WinHttp.WaitForResponse '异步发送
  responseBody = BytesToBstr(WinHttp.responseBody, "UTF-8")
  responseHeaders = WinHttp.GetAllResponseHeaders
  'load cookies
  cookieMng.AddCookiesFromHeaders responseHeaders
  lastCookies = cookieMng.getCookieOfDomain("ptlogin2.qq.com")
  'get varify code info
  tmpArr = Split(responseBody, "'")
  VerifyCode = tmpArr(3)
  jsExec.AddCode "function gets(){ return '" & tmpArr(5) & "';}"
  Salt = jsExec.Run("gets")
  jsExec.Reset
  VerifySession = tmpArr(7)
  'ready js calculation
  jsCode = fileOpr.ReadTextFile(App.path & "\script\encrypt1.js")
  jsExec.AddCode jsCode
  
  user = QQ
  pass = jsExec.Run("getEncryption", password, Salt, VerifyCode)
  '【第二步：一级登录】
  Login_Url = "https://ssl.ptlogin2.qq.com/login?u=" & user
  Login_Url = Login_Url & "&p=" & pass
  Login_Url = Login_Url & "&verifycode=" & VerifyCode
  Login_Url = Login_Url & "&webqq_type=10&remember_uin=1&login2qq=1&aid=501004106&u1=http%3A%2F%2Fw.qq.com%2Fproxy.html%3Flogin2qq%3D1%26webqq_type%3D10&h=1&ptredirect=0&ptlang=2052&daid=164&from_ui=1&pttype=1&dumy=&fp=loginerroralert&action=0-15-25234&mibao_css=m_webqq&t=1&g=1&js_type=0&js_ver=10034&login_sig=&pt_randsalt=0&pt_vcode_v1=0&pt_verifysession_v1=" & VerifySession

  WinHttp.Open "GET", Login_Url, True
  WinHttp.SetTimeouts 30000, 30000, 30000, 30000
  WinHttp.SetRequestHeader "Host", "ssl.ptlogin2.qq.com"
  WinHttp.SetRequestHeader "Connection", "keep-alive"
  WinHttp.SetRequestHeader "Accept", "*/*"
  WinHttp.SetRequestHeader "User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36"
  WinHttp.SetRequestHeader "Accept-Language", "zh-CN,zh;q=0.8"
  If lastCookies <> "" Then
    WinHttp.SetRequestHeader "Cookie", lastCookies
  End If
  WinHttp.Send            '发送
  WinHttp.WaitForResponse '异步发送
  responseBody = BytesToBstr(WinHttp.responseBody, "UTF-8")
  responseHeaders = WinHttp.GetAllResponseHeaders
  'cookies add
  cookieMng.AddCookiesFromHeaders responseHeaders
  lastCookies = cookieMng.getCookieOfDomain("qq.com")
  
  ptwebqq = cookieMng.getCookie("ptwebqq").value
  skey = cookieMng.getCookie("skey").value
  
  '【加上一步，尝试获取p_skey】
  'http://s.web2.qq.com/proxy.html?v=20130916001&callback=1&id=1
  WinHttp.Open "GET", Split(responseBody, "'")(5), True
  WinHttp.SetTimeouts 30000, 30000, 30000, 30000
  WinHttp.SetRequestHeader "Host", "ptlogin4.web2.qq.com"
  WinHttp.SetRequestHeader "Connection", "keep-alive"
  WinHttp.SetRequestHeader "Accept", "*/*"
  WinHttp.SetRequestHeader "User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36"
  WinHttp.SetRequestHeader "Accept-Language", "zh-CN,zh;q=0.8"
  WinHttp.Option(WinHttpRequestOption_EnableRedirects) = False
  If lastCookies <> "" Then
    WinHttp.SetRequestHeader "Cookie", lastCookies
  End If
  WinHttp.Send            '发送
  WinHttp.WaitForResponse '异步发送
  responseBody = BytesToBstr(WinHttp.responseBody, "UTF-8")
  responseHeaders = WinHttp.GetAllResponseHeaders
  
  cookieMng.AddCookiesFromHeaders responseHeaders
  lastCookies = cookieMng.getCookieOfNames(Array("uin", "skey", "p_skey", "ptwebqq"))
  
  '【第三步：二级登录】
  r = "{""ptwebqq"":""" & ptwebqq
  r = r & """,""clientid"":" & clientid
  r = r & ",""psessionid"":"""",""status"":""away""}"
  r = UrlEncode(r)
  WinHttp.Open "POST", "http://d.web2.qq.com/channel/login2", True
  WinHttp.SetTimeouts 30000, 30000, 30000, 30000
  WinHttp.SetRequestHeader "Host", "d.web2.qq.com"
  WinHttp.SetRequestHeader "Connection", "keep-alive"
  WinHttp.SetRequestHeader "Accept", "*/*"
  WinHttp.SetRequestHeader "User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36"
  WinHttp.SetRequestHeader "Accept-Language", "zh-CN,zh;q=0.8"
  WinHttp.SetRequestHeader "Content-Type", "application/x-www-form-urlencoded"
  WinHttp.SetRequestHeader "Content-Length", LenB(r)
  'Content-Length: 180
  WinHttp.SetRequestHeader "Referer", "http://d.web2.qq.com/proxy.html?v=20130916001&callback=1&id=2"
  'lastCookies = lastCookies & ";p_skey=" & cookieMng.getCookie("p_skey").value
  WinHttp.SetRequestHeader "Cookie", lastCookies
  WinHttp.Send "r=" & r            '发送
  'Referer: http://d.web2.qq.com/proxy.html?v=20130916001&callback=1&id=2
  WinHttp.WaitForResponse '异步发送
  responseBody = BytesToBstr(WinHttp.responseBody, "UTF-8")
  responseHeaders = WinHttp.GetAllResponseHeaders
  'cookies add
  cookieMng.AddCookiesFromHeaders responseHeaders
  lastCookies = cookieMng.cookieString()
  'loadjs
  jsExec.Reset
  jsExec.AddCode "function getData() { return " & responseBody & ";}"
  Set json = jsExec.Run("getData")
  If json.retcode = 0 Then
    psessionid = json.result.psessionid
    vfwebqq = json.result.vfwebqq
  End If
  Login = True
  Exit Function
errProcess:
  Login = False
End Function
'获取好友列表
Public Function getFriends() As Variant()
  On Error Resume Next
  'hash
  Dim hash As String
  Dim hashJS As String
  Dim r As String
  Dim json As Variant
  Dim friendAnaysis As String
  Dim pfriend As Variant
  Dim obj As Variant
  Dim qqFriends() As Variant
  Dim I As Integer
  
  hashJS = fileOpr.ReadTextFile(App.path & "\script\hash.js")
  jsExec.Reset
  jsExec.AddCode hashJS
  hash = jsExec.Run("hash", uin, ptwebqq)
  r = "{""vfwebqq"":""" & vfwebqq & """"
  r = r & ",""hash"":""" & hash & """}"
  r = UrlEncode(r)
  WinHttp.Open "POST", "http://s.web2.qq.com/api/get_user_friends2", True
  WinHttp.SetTimeouts 30000, 30000, 30000, 30000
  WinHttp.SetRequestHeader "Host", "s.web2.qq.com"
  WinHttp.SetRequestHeader "Connection", "keep-alive"
  WinHttp.SetRequestHeader "Accept", "*/*"
  WinHttp.SetRequestHeader "User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36"
  WinHttp.SetRequestHeader "Accept-Language", "zh-CN,zh;q=0.8"
  WinHttp.SetRequestHeader "Content-Type", "application/x-www-form-urlencoded"
  WinHttp.SetRequestHeader "Content-Length", LenB(r)
  'Content-Length: 180
  WinHttp.SetRequestHeader "Referer", "http://s.web2.qq.com/proxy.html?v=20130916001&callback=1&id=1"
  'lastCookies = lastCookies & ";p_skey=" & cookieMng.getCookie("p_skey").value
  WinHttp.SetRequestHeader "Cookie", lastCookies
  WinHttp.Send "r=" & r            '发送
  'Referer: http://d.web2.qq.com/proxy.html?v=20130916001&callback=1&id=2
  WinHttp.WaitForResponse '异步发送
  responseBody = BytesToBstr(WinHttp.responseBody, "UTF-8")
  responseHeaders = WinHttp.GetAllResponseHeaders
  'cookies add
  cookieMng.AddCookiesFromHeaders responseHeaders
  lastCookies = cookieMng.cookieString()
  'loadjs
  jsExec.Reset
  jsExec.AddCode "function getData() { return " & responseBody & ";}"
  Set json = jsExec.Run("getData")
  If json.retcode <> 0 Then
    MsgBox "信息获取失误！"
    Exit Function
  End If

  jsExec.Reset
  friendAnaysis = fileOpr.ReadTextFile(App.path & "\script\friends.analyse.js")
  jsExec.AddCode friendAnaysis
  Set json = jsExec.Run("analyse_friends", responseBody)

  Set pfriend = json.dataarr
  I = 0
  For Each obj In pfriend
    ReDim Preserve qqFriends(I)
    Dim qqFriend As New VB_QQ_Friend
    qqFriend.QQ = obj.QQ号
    qqFriend.RealName = obj.备注名
    qqFriend.NickName = obj.昵称
    qqFriend.Is_Vip = obj.是否VIP
    Set qqFriends(I) = qqFriend
    Set qqFriend = Nothing
    I = I + 1
  Next
  getFriends = qqFriends
End Function

Public Function getGroups()

End Function

