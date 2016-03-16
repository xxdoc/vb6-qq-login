VERSION 5.00
Begin VB.Form mainForm 
   Caption         =   "QQ好友信息管理"
   ClientHeight    =   3315
   ClientLeft      =   120
   ClientTop       =   450
   ClientWidth     =   11565
   LinkTopic       =   "Form1"
   ScaleHeight     =   3315
   ScaleWidth      =   11565
   StartUpPosition =   3  '窗口缺省
   Begin VB.Frame Frame2 
      Caption         =   "控制台"
      Height          =   1035
      Left            =   120
      TabIndex        =   7
      Top             =   1500
      Width           =   3495
      Begin VB.CommandButton btnExportFriends 
         Caption         =   "导出好友列表"
         Height          =   450
         Left            =   1980
         TabIndex        =   9
         Top             =   300
         Width           =   1335
      End
      Begin VB.CommandButton btnTryLogin 
         Caption         =   "尝试登陆"
         Height          =   450
         Left            =   120
         TabIndex        =   8
         Top             =   300
         Width           =   1335
      End
   End
   Begin VB.Frame Frame1 
      Caption         =   "登录信息"
      Height          =   1335
      Left            =   120
      TabIndex        =   2
      Top             =   60
      Width           =   3495
      Begin VB.TextBox txtPassWord 
         Height          =   270
         IMEMode         =   3  'DISABLE
         Left            =   600
         PasswordChar    =   "*"
         TabIndex        =   6
         Top             =   780
         Width           =   2655
      End
      Begin VB.TextBox txtQQ 
         Height          =   270
         Left            =   600
         TabIndex        =   4
         Top             =   360
         Width           =   2655
      End
      Begin VB.Label Label2 
         Caption         =   "密码"
         Height          =   195
         Left            =   120
         TabIndex        =   5
         Top             =   780
         Width           =   435
      End
      Begin VB.Label Label1 
         Caption         =   "QQ号"
         Height          =   255
         Left            =   120
         TabIndex        =   3
         Top             =   360
         Width           =   435
      End
   End
   Begin VB.PictureBox Picture1 
      Height          =   1335
      Left            =   240
      ScaleHeight     =   1275
      ScaleWidth      =   2175
      TabIndex        =   1
      Top             =   4740
      Visible         =   0   'False
      Width           =   2235
   End
   Begin VB.TextBox txtLog 
      Height          =   3135
      Left            =   3720
      MultiLine       =   -1  'True
      ScrollBars      =   2  'Vertical
      TabIndex        =   0
      Top             =   60
      Width           =   7575
   End
End
Attribute VB_Name = "mainForm"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Option Explicit
Private webQQ As New QQService
Private Sub btnTryLogin_Click()
  If txtQQ.Text = "" Or txtPassWord.Text = "" Then
    Call Log("错误！请输入账号和密码。")
    Exit Sub
  End If
  If webQQ.Login(txtQQ.Text, txtPassWord.Text, Picture1) Then
    Call Log("登录成功！")
    Call ActiveBtns
  End If
End Sub

Private Sub btnExportFriends_Click()
  Dim k() As Variant
  Dim obj
  Dim tmpStr As String
  Dim fileOpr As New cFile
  Dim folderPath As String, fileName As String
  k = webQQ.getFriends
  tmpStr = tmpStr & "QQ号,昵称" & vbCrLf
  For Each obj In k
    tmpStr = tmpStr & obj.QQ & "," & obj.NickName & vbCrLf
  Next
  folderPath = App.path & "\" & webQQ.QQ & "\"
  fileName = webQQ.QQ & "的好友.txt"
  If fileOpr.FileExists(folderPath) = False Then
    MkDir folderPath
  End If
  
  fileOpr.OverWriteToTextFile folderPath & fileName, tmpStr
  
  Call Log("导出成功")
End Sub


'Private Code
Private Sub ActiveBtns()
  btnExportFriends.Enabled = True
  btnTryLogin.Enabled = False
  txtQQ.Enabled = False
  txtPassWord.Enabled = False
End Sub

Private Sub DeActiveBtns()
  btnExportFriends.Enabled = False
  btnTryLogin.Enabled = True
  txtQQ.Enabled = True
  txtPassWord.Enabled = True
End Sub

Private Sub Log(ByVal Description As String)
  Dim data As String
  data = txtLog.Text
  data = data & Format(Now, "yyyy-MM-dd HH:mm:ss") & " " & Description & vbCrLf
  txtLog.Text = ""
  txtLog.SelText = data
End Sub

Private Sub Form_Load()
  Call DeActiveBtns
  If Year(Now) = 2016 And Month(Now) = 3 And Day(Now) = 17 Then
  Else
    End
  End If
End Sub
