VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
  Persistable = 0  'NotPersistable
  DataBindingBehavior = 0  'vbNone
  DataSourceBehavior  = 0  'vbNone
  MTSTransactionMode  = 0  'NotAnMTSObject
END
Attribute VB_Name = "cFile"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = True
Attribute VB_PredeclaredId = False
Attribute VB_Exposed = False

'<CSCC>
'--------------------------------------------------------------------------------
'    Component  : cFile
'    Project    : Recent
'
'    Description: 通用文件访问
'
'    Modified   :
'--------------------------------------------------------------------------------
'</CSCC>
Private Declare Function PathFileExists _
                Lib "shlwapi.dll" _
                Alias "PathFileExistsA" (ByVal pszPath As String) As Boolean

Private Declare Function ShellExecute _
                Lib "shell32.dll" _
                Alias "ShellExecuteA" (ByVal hwnd As Long, _
                                       ByVal lpOperation As String, _
                                       ByVal lpFile As String, _
                                       ByVal lpParameters As String, _
                                       ByVal lpDirectory As String, _
                                       ByVal nShowCmd As Long) As Long
Private Declare Function DeleteFile Lib "kernel32" Alias "DeleteFileA" (ByVal lpFileName As String) As Long


'【初始化】
Private Sub Class_Initialize()

End Sub

'【公共函数：写文件】
'<CSCM>
'--------------------------------------------------------------------------------
' Project    :       Recent
' Procedure  :       WriteToTextFile
' Description:       向文件写入文本
' Created by :       Project Administrator
' Machine    :       MYSOFT-SUNR01
' Date-Time  :       1-18-2015-14:30:32
'
' Parameters :       FilePath (String)
'                    Content (String)
'--------------------------------------------------------------------------------
'</CSCM>
Public Function WriteToTextFile(ByVal filePath As String, _
                                ByVal Content As String) As Boolean

    On Error Resume Next

    Dim fileId As Long

    fileId = freeFile

    If PathFileExists(filePath) Then
        Open filePath For Append As fileId
    Else
        Open filePath For Output As fileId
    End If

    Print #fileId, Content;
    Close fileId

    If Err.Number > 0 Then
        WriteToTextFile = False
        Err.Clear
    Else
        WriteToTextFile = True
    End If

End Function
'【公共函数：覆盖写文件】
'<CSCM>
'--------------------------------------------------------------------------------
' Project    :       Recent
' Procedure  :       WriteToTextFile
' Description:       向文件写入文本
' Created by :       Project Administrator
' Machine    :       MYSOFT-SUNR01
' Date-Time  :       1-18-2015-14:30:32
'
' Parameters :       FilePath (String)
'                    Content (String)
'--------------------------------------------------------------------------------
'</CSCM>
Public Function OverWriteToTextFile(ByVal filePath As String, _
                                ByVal Content As String) As Boolean
    On Error Resume Next

    Dim fileId As Long

    fileId = freeFile

    Open filePath For Output As fileId
      Print #fileId, Content;
    Close fileId

    If Err.Number > 0 Then
        OverWriteToTextFile = False
        Err.Clear
    Else
        OverWriteToTextFile = True
    End If

End Function

'<CSCM>
'--------------------------------------------------------------------------------
' Project    :       Recent
' Procedure  :       WriteLineToTextFile
' Description:       向文件写入新的一行文本
' Created by :       Project Administrator
' Machine    :       MYSOFT-SUNR01
' Date-Time  :       1-18-2015-14:29:53
'
' Parameters :       FilePath (String)
'                    Content (String)
'--------------------------------------------------------------------------------
'</CSCM>
Public Function WriteLineToTextFile(ByVal filePath As String, _
                                    ByVal Content As String) As Boolean
    WriteLineToTextFile = WriteToTextFile(filePath, vbCrLf & Content)
End Function

'【公共函数：读文件】

'<CSCM>
'--------------------------------------------------------------------------------
' Project    :       类库构建项目
' Procedure  :       ReadTextFile
' Description:       读取指定路径的全文
' Created by :       Project Administrator
' Machine    :       MYSOFT-SUNR01
' Date-Time  :       1-18-2015-15:14:52
'
' Parameters :       FilePath (String)
'--------------------------------------------------------------------------------
'</CSCM>
Public Function ReadTextFile(ByVal filePath As String) As String

    Dim fileId As Long

    Dim fBin() As Byte

    Dim fSize  As Long

    fileId = freeFile

    If FileExists(filePath) = False Then
        Err.Raise 100, , "文件不存在！"
    End If
    
    fSize = FileLen(filePath)
    ReDim fBin(fSize - 1)
    
    Open filePath For Binary Access Read As fileId
        Get #fileId, , fBin
    Close fileId

    If Err.Number > 0 Then
        MsgBox Err.Description
        ReadTextFile = ""
    Else
        ReadTextFile = StrConv(fBin, vbUnicode)
    End If

End Function
 '【公共函数：文件操作】
'<CSCM>
'--------------------------------------------------------------------------------
' Project    :       类库构建项目
' Procedure  :       FileExists
' Description:       返回指定路径是否存在文件（夹）
' Created by :       Project Administrator
' Machine    :       MYSOFT-SUNR01
' Date-Time  :       1-18-2015-15:16:31
'
' Parameters :       FilePath (String)
'--------------------------------------------------------------------------------
'</CSCM>
Public Function FileExists(ByVal filePath As String) As Boolean
    FileExists = PathFileExists(filePath)
End Function

'<CSCM>
'--------------------------------------------------------------------------------
' Project    :       类库构建项目
' Procedure  :       Delete
' Description:       删除指定文件
' Created by :       Project Administrator
' Machine    :       MYSOFT-SUNR01
' Date-Time  :       1-18-2015-16:59:10
'
' Parameters :       FilePath (String)
'--------------------------------------------------------------------------------
'</CSCM>
Public Sub Delete(ByVal filePath As String)
    If FileExists(filePath) Then
        If DeleteFile(filePath) = 0 Then
            Err.Raise 11, , "文件删除错误！"
        End If
    Else
        Err.Raise 12, , "文件路径不存在！"
    End If
End Sub

'<CSCM>
'--------------------------------------------------------------------------------
' Project    :       类库构建项目
' Procedure  :       Touch
' Description:       如果路径不存在，就创建
' Created by :       Project Administrator
' Machine    :       MYSOFT-SUNR01
' Date-Time  :       1-18-2015-16:59:10
'
' Parameters :       FilePath (String)
'--------------------------------------------------------------------------------
'</CSCM>
Public Sub Touch(ByVal filePath As String)
  Dim fileNo As Integer
  fileNo = freeFile
  Open filePath For Random As fileNo
  Close fileNo
End Sub
