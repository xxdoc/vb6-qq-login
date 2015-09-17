VERSION 5.00
Begin VB.Form Form1 
   Caption         =   "Form1"
   ClientHeight    =   5220
   ClientLeft      =   120
   ClientTop       =   450
   ClientWidth     =   10590
   LinkTopic       =   "Form1"
   ScaleHeight     =   5220
   ScaleWidth      =   10590
   StartUpPosition =   3  '´°¿ÚÈ±Ê¡
   Begin VB.CommandButton Command3 
      Caption         =   "cookie"
      Height          =   435
      Left            =   6720
      TabIndex        =   3
      Top             =   1560
      Width           =   1335
   End
   Begin VB.CommandButton Command2 
      Caption         =   "urlencode"
      Height          =   495
      Left            =   6720
      TabIndex        =   2
      Top             =   900
      Width           =   1455
   End
   Begin VB.CommandButton Command1 
      Caption         =   "Command1"
      Height          =   495
      Left            =   6720
      TabIndex        =   1
      Top             =   120
      Width           =   1455
   End
   Begin VB.TextBox Text1 
      Height          =   5055
      Left            =   60
      MultiLine       =   -1  'True
      ScrollBars      =   2  'Vertical
      TabIndex        =   0
      Top             =   120
      Width           =   6195
   End
End
Attribute VB_Name = "Form1"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Option Explicit

Private k As New VB_Cookie
Private col As New VB_ExCollection

Private Sub Command1_Click()
  'k.AddCookiesFromHeaders Text1.Text
  Dim keys As String
  col.SetItem "loves", "sunrui"
  col.SetItem "country", "chi""na"
  col.SetItem "city", "wuhan"
  keys = col.Join(";")
  Exit Sub
End Sub

Private Sub Command2_Click()
  Text1.Text = UrlEncode(Text1.Text)
End Sub

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

Private Sub Command3_Click()
  Dim k As New VB_Cookie
  k.AddCookiesFromHeaders Text1.Text
  Exit Sub
End Sub
