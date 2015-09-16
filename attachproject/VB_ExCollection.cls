VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
  Persistable = 0  'NotPersistable
  DataBindingBehavior = 0  'vbNone
  DataSourceBehavior  = 0  'vbNone
  MTSTransactionMode  = 0  'NotAnMTSObject
END
Attribute VB_Name = "VB_ExCollection"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = True
Attribute VB_PredeclaredId = False
Attribute VB_Exposed = False
Option Explicit

Private collection As collection
'【私有-函数】
Private Function exists(ByVal key As Variant) As Boolean
  On Error GoTo errHandle
  collection.Item key
  exists = True
  Exit Function
errHandle:
  exists = False
End Function


'【公有-属性】
Public Property Get Item(key As Variant) As Variant
  If exists(key) Then
    Item = collection.Item(key)
  Else
    Set Item = Nothing
  End If
End Property

Public Property Get Count() As Long
  Count = collection.Count
End Property

'【公开-方法】
Public Sub SetItem(key As Variant, value As Variant)
  If exists(key) Then
    collection.Remove key
  End If
  collection.Add value, key
End Sub

Public Function SafeGetItem(key As Variant) As Variant
  If exists(key) Then
    SafeGetItem = collection.Item(key)
  Else
    SafeGetItem = ""
  End If
End Function

Public Sub Remove(key As Variant)
  If exists(key) Then
    collection.Remove key
  End If
End Sub

'类初始化
Private Sub Class_Initialize()
  Set collection = New collection
End Sub

Private Sub Class_Terminate()
  Set collection = Nothing
End Sub
