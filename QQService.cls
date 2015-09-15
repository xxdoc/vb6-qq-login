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
  Private baiduId As String
  Private token As String
  Private UBI As String
  Private codestring As String
  Private yanzhengma As String
  
  Private HISTORY As String
  Private BDUSS As String
  Private PTOKEN As String
  Private STOKEN As String
  Private SAVEUSERID As String
  Private USERNAMETYPE As String
  Private PASSID As String
  
  Private IS_NEW_USER As String
  Private BAIDU_WISE_UID As String
  Private TIEBAUID As String
  
  Private tbs As String
  
  '贴吧列表
  Private tieba() As String
  
  
  Private WinHttp As WinHttp.WinHttpRequest
  Private fileOpr As New cFile
  Private jsExec As New ScriptControl
  Private lastCookies As String
'------------------------------------------------------------------------------
'       属性变量
'------------------------------------------------------------------------------


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
  '
  Set WinHttp = Nothing
  Dim J() As String
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

Private Function CollectCookie(ByVal HeaderString As String) As String
  Dim lines() As String
  Dim line As String
  Dim I As Integer, cookieContentLoc As Integer
  Dim cookies As String
  lines = Split(HeaderString, vbCrLf)
  I = 0
  For I = 0 To UBound(lines)
    line = lines(I)
    cookieContentLoc = InStr(1, line, "Set-Cookie:")
    If InStr(1, line, "Set-Cookie:") > 0 Then
      cookieContentLoc = cookieContentLoc + Len("Set-Cookie:")
      cookies = cookies & Mid(line, cookieContentLoc)
    End If
  Next I
  CollectCookie = cookies
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
Public Sub Login(ByVal qq As String, ByVal password As String, ByRef pictureBox As pictureBox)
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
  
  Set WinHttp = CreateObject("WinHttp.WinHttpRequest.5.1")
  'https://ssl.ptlogin2.qq.com/check?pt_tea=1&uin=[QQNumber]&appid=501004106&js_ver=10034&js_type=0&login_sig=&u1=http%3A%2F%2Fw.qq.com%2Fproxy.html&r=0.23477151861080792
  Verify_Code_Url = "https://ssl.ptlogin2.qq.com/check?pt_tea=1&uin=[QQNumber]&appid=501004106&js_ver=10034&js_type=0&login_sig=&u1=http%3A%2F%2Fw.qq.com%2Fproxy.html&r=0.23477151861080792"
  Verify_Code_Url = Replace(Verify_Code_Url, "[QQNumber]", qq)
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
  lastCookies = CollectCookie(responseHeaders)
  'get varify code info
  tmpArr = Split(responseBody, "'")
  VerifyCode = tmpArr(3)
  jsExec.AddCode "function gets(){ return '" & tmpArr(5) & "';}"
  Salt = jsExec.Run("gets")
  jsExec.Reset
  VerifySession = tmpArr(7)
  'ready js calculation
  jsCode = fileOpr.ReadTextFile(App.Path & "\encrypt1.js")
  jsExec.AddCode jsCode
  
  user = qq
  pass = jsExec.Run("getEncryption", password, Salt, VerifyCode)
  'login
  Login_Url = "https://ssl.ptlogin2.qq.com/login?u=" & user
  Login_Url = Login_Url & "&p=" & pass
  Login_Url = Login_Url & "&verifycode=" & VerifyCode
  Login_Url = Login_Url & "&webqq_type=10&remember_uin=1&login2qq=1&aid=501004106&u1=http%3A%2F%2Fw.qq.com%2Fproxy.html%3Flogin2qq%3D1%26webqq_type%3D10&h=1&ptredirect=0&ptlang=2052&daid=164&from_ui=1&pttype=1&dumy=&fp=loginerroralert&action=0-15-25234&mibao_css=m_webqq&t=1&g=1&js_type=0&js_ver=10034&login_sig=&pt_randsalt=0&pt_vcode_v1=0&pt_verifysession_v1=" & VerifySession
  'Set obj = jsExec.Run("getRSA")
  
  
  WinHttp.Open "GET", Login_Url, True
  WinHttp.SetTimeouts 30000, 30000, 30000, 30000
  WinHttp.SetRequestHeader "Host", "ssl.ptlogin2.qq.com"
  WinHttp.SetRequestHeader "Connection", "keep-alive"
  WinHttp.SetRequestHeader "Accept", "*/*"
  WinHttp.SetRequestHeader "User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36"
  'WinHttp.SetRequestHeader "Referer", "http://www.baidu.com/cache/user/html/login-1.2.html"
  WinHttp.SetRequestHeader "Accept-Language", "zh-CN,zh;q=0.8"
  WinHttp.SetRequestHeader "Cookie", lastCookies
  WinHttp.Send            '发送
  WinHttp.WaitForResponse '异步发送
  responseBody = BytesToBstr(WinHttp.responseBody, "UTF-8")
  responseHeaders = WinHttp.GetAllResponseHeaders
  
  tmpArr = Split(responseBody, "'")
  If InStr(1, responseBody, "登录成功") > 0 Then
    MsgBox "登录成功！"
  End If
End Sub

Public Sub SignTieBa(ByRef showList As ListBox, ByRef sourceList As ListBox)
  Dim tiebaName As String
  Dim b As Integer
  For b = 1 To UBound(tieba)
    tiebaName = tieba(b)
    If Not sourceList Is Nothing Then
      sourceList.ListIndex = b - 1
    End If
    
    '-----------------------------------------------------------------
    WinHttp.Open "GET", "http://tieba.baidu.com/mo/q/sign?tbs=" & tbs & "&kw=" & tiebaName & "&is_like=1&fid=1177", True
    WinHttp.SetTimeouts 30000, 30000, 30000, 30000
    WinHttp.SetRequestHeader "Host", "tieba.baidu.com"
    WinHttp.SetRequestHeader "Connection", "keep-alive"
    WinHttp.SetRequestHeader "Accept", "application/json"
    WinHttp.SetRequestHeader "X-Requested-With", "XMLHttpRequest"
    WinHttp.SetRequestHeader "User-Agent", "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5"
    WinHttp.SetRequestHeader "Referer", "http://tieba.baidu.com/f?kw=" & tiebaName & "&pn=0&"
    WinHttp.SetRequestHeader "Accept-Language", "zh-CN,zh;q=0.8"
    WinHttp.SetRequestHeader "Cookie", "BAIDUID=" & baiduId & "; BDUSS=" & BDUSS & "; IS_NEW_USER=" & IS_NEW_USER & "; BAIDU_WISE_UID=" & BAIDU_WISE_UID & "; TIEBAUID=" & TIEBAUID & "; CLIENTWIDTH=320; CLIENTHEIGHT=480; SEENKW=vb; mo_originid=2; LASW=320; is_hide_sign_like_client_ad_dialog=true"
    WinHttp.Send            '发送
    WinHttp.WaitForResponse '异步发送
    responseBody = BytesToBstr(WinHttp.responseBody, "utf-8")
    responseHeaders = WinHttp.GetAllResponseHeaders
    If InStr(responseBody, "{" & Chr(34) & "no" & Chr(34) & ":0," & Chr(34) & "error") > 0 Then
      showList.AddItem Now & " " & tiebaName & " " & "签到成功！": showList.ListIndex = showList.ListCount - 1
    Else
      If InStr(responseBody, "\u4eb2\uff0c\u4f60\u4e4b\u524d\u5df2\u7ecf\u7b7e\u8fc7\u4e86") > 0 Then
        showList.AddItem Now & " " & tiebaName & " " & "签到失败！重复签到。": showList.ListIndex = showList.ListCount - 1
      Else
        showList.AddItem Now & " " & tiebaName & " " & "签到失败！原因未知。": showList.ListIndex = showList.ListCount - 1
      End If
    End If
    '-----------------------------------------------------------------签到
    DoEvents
  Next b
End Sub

