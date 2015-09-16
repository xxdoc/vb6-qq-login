VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
  Persistable = 0  'NotPersistable
  DataBindingBehavior = 0  'vbNone
  DataSourceBehavior  = 0  'vbNone
  MTSTransactionMode  = 0  'NotAnMTSObject
END
Attribute VB_Name = "VB_Cookie"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = True
Attribute VB_PredeclaredId = False
Attribute VB_Exposed = False
Option Explicit

Private cookies As VB_ExCollection

Private Sub Class_Initialize()
  Set cookies = New VB_ExCollection
End Sub

Private Sub Class_Terminate()
  Set cookies = Nothing
End Sub

'private functions
Public Sub AddCookiesFromHeaders(ByVal respHeaders As String)
  Dim tmpArr() As String, cookieStr As String, cookieStrs() As String
  Dim i As Integer, cookieContentLoc As Integer, j As Integer
  tmpArr = Split(respHeaders, vbCrLf)
  For i = 0 To UBound(tmpArr)
    cookieStr = tmpArr(i)
    cookieContentLoc = InStr(1, cookieStr, "Set-Cookie:")
    If cookieContentLoc > 0 Then
      cookieContentLoc = cookieContentLoc + Len("Set-Cookie:")
      cookieStrs = Split(Mid(cookieStr, cookieContentLoc), ";")
      For j = 0 To UBound(cookieStrs)
        addCookieFromStr cookieStrs(j)
      Next j
    End If
  Next i
End Sub

Private Sub addCookieFromStr(ByVal singleCookie As String)
  Dim cookiePair() As String
  If InStr(1, singleCookie, "=") > 0 Then
    cookiePair = Split(singleCookie, "=")
    cookies.SetItem Trim(cookiePair(0)), cookiePair(1)
  End If
End Sub

Public Function getCookie(ByVal cookieName As String) As String
  getCookie = cookies.SafeGetItem(cookieName)
End Function

