VERSION 5.00
Begin VB.Form Form1 
   BorderStyle     =   4  'Fixed ToolWindow
   Caption         =   "MD5"
   ClientHeight    =   1515
   ClientLeft      =   45
   ClientTop       =   285
   ClientWidth     =   7575
   LinkTopic       =   "Form1"
   MaxButton       =   0   'False
   MinButton       =   0   'False
   ScaleHeight     =   1515
   ScaleWidth      =   7575
   ShowInTaskbar   =   0   'False
   StartUpPosition =   3  '窗口缺省
   Begin VB.CommandButton Command2 
      Caption         =   "..."
      Height          =   375
      Left            =   5640
      TabIndex        =   8
      Top             =   260
      Width           =   615
   End
   Begin VB.Frame Frame4 
      BackColor       =   &H00E0E0E0&
      Caption         =   "File"
      Height          =   615
      Left            =   2160
      TabIndex        =   6
      Top             =   110
      Width           =   4215
      Begin VB.TextBox Text3 
         BeginProperty Font 
            Name            =   "宋体"
            Size            =   12
            Charset         =   134
            Weight          =   400
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   390
         Left            =   120
         TabIndex        =   7
         Top             =   160
         Width           =   3255
      End
   End
   Begin VB.CommandButton Command1 
      Caption         =   "&Trans"
      Height          =   375
      Left            =   6480
      TabIndex        =   5
      Top             =   240
      Width           =   975
   End
   Begin VB.TextBox Text1 
      BeginProperty Font 
         Name            =   "宋体"
         Size            =   12
         Charset         =   134
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   375
      Left            =   240
      TabIndex        =   4
      Text            =   "anlige"
      Top             =   270
      Width           =   1695
   End
   Begin VB.Frame Frame3 
      BackColor       =   &H00E0E0E0&
      Caption         =   "String"
      Height          =   615
      Left            =   120
      TabIndex        =   3
      Top             =   110
      Width           =   1935
   End
   Begin VB.TextBox Text2 
      BeginProperty Font 
         Name            =   "宋体"
         Size            =   12
         Charset         =   134
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   375
      Left            =   240
      TabIndex        =   1
      Top             =   880
      Width           =   7095
   End
   Begin VB.Frame Frame2 
      BackColor       =   &H00E0E0E0&
      Caption         =   "Result"
      Height          =   615
      Left            =   120
      TabIndex        =   2
      Top             =   720
      Width           =   7335
   End
   Begin VB.Frame Frame1 
      BackColor       =   &H00E0E0E0&
      Height          =   1575
      Left            =   0
      TabIndex        =   0
      Top             =   -60
      Width           =   7575
   End
End
Attribute VB_Name = "Form1"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Private Sub Command1_Click()
Dim cl As Class1
Set cl = New Class1
Dim str As String
str = cl.Md5_String_Calc(Text1)
Text2.Text = Mid(str, 1, 5) & " " & Mid(str, 6, 5) & " " & Mid(str, 11, 5) & " " & Mid(str, 16, 5) & " " & Mid(str, 21, 5) & " " & Mid(str, 26, 5) & " " & Mid(str, 31, 2)
End Sub

Private Sub Command2_Click()
Dim c2 As Class1
Set c2 = New Class1
Dim str As String
str = c2.Md5_File_Calc(Text3)
Text2.Text = Mid(str, 1, 5) & " " & Mid(str, 6, 5) & " " & Mid(str, 11, 5) & " " & Mid(str, 16, 5) & " " & Mid(str, 21, 5) & " " & Mid(str, 26, 5) & " " & Mid(str, 31, 2)
End Sub
