import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Denomination {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
}

const Denominations = () => {
  const { toast } = useToast();
  const [denominations, setDenominations] = useState<Denomination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDenomination, setSelectedDenomination] = useState<Denomination | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_active: true,
  });

  const fetchDenominations = async () => {
    try {
      const { data, error } = await supabase
        .from("denominations")
        .select("*")
        .order("name");

      if (error) throw error;
      setDenominations(data || []);
    } catch (error) {
      console.error("Error fetching denominations:", error);
      toast({
        title: "Error",
        description: "Failed to fetch denominations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDenominations();
  }, []);

  const openAddDialog = () => {
    setIsEditing(false);
    setFormData({ name: "", description: "", is_active: true });
    setShowDialog(true);
  };

  const openEditDialog = (denomination: Denomination) => {
    setIsEditing(true);
    setSelectedDenomination(denomination);
    setFormData({
      name: denomination.name,
      description: denomination.description || "",
      is_active: denomination.is_active,
    });
    setShowDialog(true);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      if (isEditing && selectedDenomination) {
        const { error } = await supabase
          .from("denominations")
          .update({
            name: formData.name,
            description: formData.description || null,
            is_active: formData.is_active,
          })
          .eq("id", selectedDenomination.id);

        if (error) throw error;
        toast({ title: "Denomination updated successfully" });
      } else {
        const { error } = await supabase.from("denominations").insert({
          name: formData.name,
          description: formData.description || null,
          is_active: formData.is_active,
        });

        if (error) throw error;
        toast({ title: "Denomination added successfully" });
      }

      setShowDialog(false);
      fetchDenominations();
    } catch (error: any) {
      console.error("Error saving denomination:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save denomination",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedDenomination) return;

    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from("denominations")
        .delete()
        .eq("id", selectedDenomination.id);

      if (error) throw error;

      toast({ title: "Denomination deleted" });
      setShowDeleteDialog(false);
      setSelectedDenomination(null);
      fetchDenominations();
    } catch (error: any) {
      console.error("Error deleting denomination:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete denomination",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Denominations</h1>
          <p className="text-muted-foreground">Manage Christian denominations/castes</p>
        </div>
        <Button onClick={openAddDialog} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Denomination
        </Button>
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <div className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : denominations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No denominations found
                </TableCell>
              </TableRow>
            ) : (
              denominations.map((denomination) => (
                <TableRow key={denomination.id}>
                  <TableCell className="font-medium">{denomination.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {denomination.description || "-"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        denomination.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {denomination.is_active ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => openEditDialog(denomination)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => {
                          setSelectedDenomination(denomination);
                          setShowDeleteDialog(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Denomination" : "Add Denomination"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter denomination name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter description (optional)"
                rows={3}
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_active: checked })
                }
              />
              <Label htmlFor="is_active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isProcessing}>
              {isEditing ? "Update" : "Add"} Denomination
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Denomination</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Are you sure you want to delete "{selectedDenomination?.name}"? This action cannot
            be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isProcessing}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Denominations;
