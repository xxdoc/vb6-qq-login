VERSION 5.00
Object = "{6B7E6392-850A-101B-AFC0-4210102A8DA7}#1.3#0"; "COMCTL32.OCX"
Begin VB.Form Form1 
   Caption         =   "VB6.0 RSA算法演示"
   ClientHeight    =   6675
   ClientLeft      =   60
   ClientTop       =   450
   ClientWidth     =   8715
   Icon            =   "Form1.frx":0000
   LinkTopic       =   "Form1"
   ScaleHeight     =   6675
   ScaleWidth      =   8715
   StartUpPosition =   3  '窗口缺省
   Begin ComctlLib.StatusBar StatusBar1 
      Align           =   2  'Align Bottom
      Height          =   345
      Left            =   0
      TabIndex        =   17
      Top             =   6330
      Width           =   8715
      _ExtentX        =   15372
      _ExtentY        =   609
      SimpleText      =   ""
      _Version        =   327682
      BeginProperty Panels {0713E89E-850A-101B-AFC0-4210102A8DA7} 
         NumPanels       =   2
         BeginProperty Panel1 {0713E89F-850A-101B-AFC0-4210102A8DA7} 
            Bevel           =   2
            Object.Width           =   4410
            MinWidth        =   4410
            Text            =   "就绪！"
            TextSave        =   "就绪！"
            Key             =   ""
            Object.Tag             =   ""
            Object.ToolTipText     =   ""
         EndProperty
         BeginProperty Panel2 {0713E89F-850A-101B-AFC0-4210102A8DA7} 
            AutoSize        =   1
            Object.Width           =   10398
            Text            =   "本演示程序界面所示的数字为“十六进制”，内核演算则为十进制。"
            TextSave        =   "本演示程序界面所示的数字为“十六进制”，内核演算则为十进制。"
            Object.Tag             =   ""
         EndProperty
      EndProperty
   End
   Begin VB.CommandButton Command_endsub 
      Caption         =   "退出"
      Height          =   375
      Left            =   7095
      TabIndex        =   16
      Top             =   5730
      Width           =   960
   End
   Begin VB.CommandButton Command_D 
      Caption         =   "解密"
      Height          =   375
      Left            =   2400
      TabIndex        =   13
      Top             =   5730
      Width           =   960
   End
   Begin VB.CommandButton Command_E 
      Caption         =   "加密"
      Height          =   375
      Left            =   1335
      TabIndex        =   12
      Top             =   5730
      Width           =   960
   End
   Begin VB.TextBox TextDM 
      Height          =   810
      Left            =   1335
      MultiLine       =   -1  'True
      TabIndex        =   11
      Top             =   4755
      Width           =   6750
   End
   Begin VB.TextBox TextCM 
      Height          =   810
      Left            =   1335
      MultiLine       =   -1  'True
      TabIndex        =   7
      Top             =   3780
      Width           =   6750
   End
   Begin VB.TextBox TextM 
      Height          =   810
      Left            =   1335
      MultiLine       =   -1  'True
      TabIndex        =   6
      Top             =   2805
      Width           =   6750
   End
   Begin VB.TextBox TextD 
      Height          =   810
      Left            =   1335
      MultiLine       =   -1  'True
      TabIndex        =   5
      Top             =   1830
      Width           =   6750
   End
   Begin VB.TextBox TextE 
      Height          =   300
      Left            =   1335
      MultiLine       =   -1  'True
      TabIndex        =   3
      Top             =   1380
      Width           =   6750
   End
   Begin VB.TextBox TextN 
      Height          =   810
      Left            =   1335
      MultiLine       =   -1  'True
      TabIndex        =   0
      Top             =   420
      Width           =   6750
   End
   Begin VB.Label Label1 
      AutoSize        =   -1  'True
      Caption         =   "M'=C^E mod N"
      ForeColor       =   &H80000002&
      Height          =   180
      Index           =   7
      Left            =   150
      TabIndex        =   15
      Top             =   4995
      Width           =   1080
   End
   Begin VB.Label Label1 
      AutoSize        =   -1  'True
      Caption         =   "C=M^D mod N"
      ForeColor       =   &H80000002&
      Height          =   180
      Index           =   6
      Left            =   240
      TabIndex        =   14
      Top             =   4005
      Width           =   990
   End
   Begin VB.Label Label1 
      AutoSize        =   -1  'True
      Caption         =   "解密M'"
      Height          =   180
      Index           =   5
      Left            =   690
      TabIndex        =   10
      Top             =   4755
      Width           =   540
   End
   Begin VB.Label Label1 
      AutoSize        =   -1  'True
      Caption         =   "密文C"
      Height          =   180
      Index           =   4
      Left            =   780
      TabIndex        =   9
      Top             =   3780
      Width           =   450
   End
   Begin VB.Label Label1 
      AutoSize        =   -1  'True
      Caption         =   "明文M"
      Height          =   180
      Index           =   3
      Left            =   780
      TabIndex        =   8
      Top             =   2805
      Width           =   450
   End
   Begin VB.Label Label1 
      AutoSize        =   -1  'True
      Caption         =   "私钥D"
      Height          =   180
      Index           =   2
      Left            =   780
      TabIndex        =   4
      Top             =   1830
      Width           =   450
   End
   Begin VB.Label Label1 
      AutoSize        =   -1  'True
      Caption         =   "E"
      Height          =   180
      Index           =   1
      Left            =   1140
      TabIndex        =   2
      Top             =   1380
      Width           =   90
   End
   Begin VB.Label Label1 
      AutoSize        =   -1  'True
      Caption         =   "N"
      Height          =   180
      Index           =   0
      Left            =   1140
      TabIndex        =   1
      Top             =   420
      Width           =   90
   End
End
Attribute VB_Name = "Form1"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
'Download by http://www.NewXing.com
Public bpm As RSACal

Private Sub Command_D_Click()
TextDM.Text = bpm.HexToStr(bpm.dectohex(bpm.BigPowMod(bpm.hextodec(TextCM.Text), bpm.hextodec(TextE.Text), bpm.hextodec(TextN.Text))))
End Sub

Private Sub Command_E_Click()
'将明文输入框的文字进行一定的转换:字符串-十六进制-十进制
StatusBar1.Panels(1).Text = "运算中，等候时间较长..."
StatusBar1.Refresh
Dim str As String
str = bpm.StrToHex(TextM.Text)
str = bpm.hextodec(str)
'调用模幂函数,用私钥加密,生成所谓的注册码,为使注册码简短用十六进制表示
TextCM.Text = bpm.dectohex(bpm.BigPowMod(str, bpm.hextodec(TextD.Text), bpm.hextodec(TextN.Text)))
StatusBar1.Panels(1).Text = "就绪！"
End Sub

Private Sub Command_endsub_Click()
Unload Me
End Sub

Private Sub Form_Load()
Set bpm = New RSACal
TextE = "10001"
TextN = "86DB75A3083842693F1A1FF1E0CB3866C161BC7C0304AE8EB64F5561BE793D46F0F9B7197FAC48EBF9ADEC297DC2F8B86F2714B3EB9E4C11C68532FC8B175551"
TextD = "24D2B1E9656A2F401BB9DF75256378301EA7B856C86033E5C6041D9545F446F5BD4961FE0686E48324177D71FF7BE6252CCF753A91F84153038F2C58A97884ED"
End Sub
