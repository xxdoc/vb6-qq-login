VERSION 5.00
Begin VB.Form mainForm 
   Caption         =   "Form1"
   ClientHeight    =   5130
   ClientLeft      =   120
   ClientTop       =   450
   ClientWidth     =   11130
   LinkTopic       =   "Form1"
   ScaleHeight     =   5130
   ScaleWidth      =   11130
   StartUpPosition =   3  '´°¿ÚÈ±Ê¡
   Begin VB.PictureBox Picture1 
      Height          =   1335
      Left            =   120
      ScaleHeight     =   1275
      ScaleWidth      =   2175
      TabIndex        =   2
      Top             =   780
      Width           =   2235
   End
   Begin VB.TextBox txtCode 
      Height          =   4875
      Left            =   2400
      MultiLine       =   -1  'True
      ScrollBars      =   2  'Vertical
      TabIndex        =   1
      Top             =   120
      Width           =   8595
   End
   Begin VB.CommandButton btnTryLogin 
      Caption         =   "³¢ÊÔµÇÂ½"
      Height          =   495
      Left            =   120
      TabIndex        =   0
      Top             =   120
      Width           =   2235
   End
End
Attribute VB_Name = "mainForm"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Option Explicit

Private Sub btnTryLogin_Click()
  Dim webQQ As New QQService
  webQQ.Login "656972278", "sunwin", Picture1
  'Dim md5 As New VB_MD5
  'txtCode.Text = md5.Md5_String_Calc("123")
'  Dim rsa As New VB_RSA
'  Dim jk As String
'  jk = rsa.Encode("we are the world", 256, 256)
'  jk = jk & "¡¾¡¿" & rsa.Decode(jk, 256, 256)
'  txtCode.SelText = jk
'  Dim fileOpr As New cFile
'  Dim code As String
'  code = fileOpr.ReadTextFile(App.Path & "\encrypt.js")
'  Dim src As New ScriptControl
'  src.Language = "JavaScript"
'  src.AddCode code
'  txtCode.Text = src.Run("$.Encryption.getEncryption")
End Sub
