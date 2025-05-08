// src/components/MaterialTraceability.tsx
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  queryAsset,
  getAssetComponents,
  ComponentTrace
} from '@/lib/mockBlockchain';
import { Loader2, Package, MapPin, Tag, BadgeCheck, Phone, Globe, Map, Layers } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const MaterialTraceability: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [itemId, setItemId] = useState('');
  const [components, setComponents] = useState<ComponentTrace[]>([]);
  const [assetInfo, setAssetInfo] = useState<{ brand: string; model: string } | null>(null);

  const handleTrace = async () => {
    if (!itemId) {
      toast({
        title: "Validation Error",
        description: "Please enter an Item ID",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // 1) fetch asset info
      const assetResult = await queryAsset(itemId);
      if (!assetResult.success || !assetResult.asset) {
        toast({
          title: "Asset Not Found",
          description: assetResult.error || "Could not find asset with this ID",
          variant: "destructive"
        });
        setComponents([]);
        setAssetInfo(null);
        return;
      }
      setAssetInfo({
        brand: assetResult.asset.brand,
        model: assetResult.asset.model
      });

      // 2) fetch components
      const compResult = await getAssetComponents(itemId);
      if (!compResult.success) {
        toast({
          title: "Components Not Found",
          description: compResult.error || "No material data available for this item",
          variant: "destructive"
        });
        setComponents([]);
      } else {
        setComponents(compResult.components || []);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to trace material components",
        variant: "destructive"
      });
      setComponents([]);
      setAssetInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Title + Description */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-luxury-navy">Material Traceability</h2>
        <p className="text-muted-foreground">
          Verify the component materials and certifications of any luxury asset.
        </p>
      </div>

      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Label htmlFor="itemIdInput">Item ID</Label>
          <Input
            id="itemIdInput"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            placeholder="Enter item ID (e.g. ITEM001)"
            className="border-luxury-navy/20"
          />
        </div>
        <div className="flex items-end">
          <Button
            onClick={handleTrace}
            disabled={isLoading || !itemId}
            className="bg-luxury-navy hover:bg-luxury-navy/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'View Materials'
            )}
          </Button>
        </div>
      </div>

      {/* Asset Header Card */}
      {assetInfo && (
        <div className="mb-6">
          <Card className="border-luxury-gold/20">
            <CardHeader className="bg-luxury-navy text-white">
              <CardTitle>{assetInfo.brand} {assetInfo.model}</CardTitle>
              <CardDescription className="text-luxury-silver/80">
                Material Composition & Certifications
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}

      {/* Desktop Table */}
      {components.length > 0 && (
        <div className="hidden md:block mb-8">
          <Table className="border rounded-lg overflow-hidden">
            <TableHeader className="bg-luxury-navy/5">
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Coords</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Weight (g)</TableHead>
                <TableHead>Batch #</TableHead>
                <TableHead>Certifications</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {components.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.supplier}</TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      {c.supplierContact?.phone && (
                        <div><Phone className="inline-block mr-1 w-3 h-3" />{c.supplierContact.phone}</div>
                      )}
                      {c.supplierContact?.email && (
                        <div><BadgeCheck className="inline-block mr-1 w-3 h-3" />{c.supplierContact.email}</div>
                      )}
                      {c.supplierContact?.website && (
                        <div><Globe className="inline-block mr-1 w-3 h-3" />
                          <a href={c.supplierContact.website} target="_blank" rel="noreferrer" className="underline">
                            Visit
                          </a>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{c.origin}</TableCell>
                  <TableCell>
                    {c.coordinates 
                      ? `${c.coordinates.lat.toFixed(4)}, ${c.coordinates.lng.toFixed(4)}` 
                      : '—'}
                  </TableCell>
                  <TableCell>{c.materialType || '—'}</TableCell>
                  <TableCell>{c.weightGrams != null ? c.weightGrams : '—'}</TableCell>
                  <TableCell>{c.batchNumber}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {c.certifications.map((cert, i) => (
                        <Badge key={i} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <BadgeCheck className="mr-1 h-3 w-3" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {/* Mobile Cards */}
      {components.length > 0 && (
        <div className="md:hidden space-y-6">
          {components.map((c) => (
            <Card key={c.id} className="border-luxury-silver/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-luxury-navy flex items-center">
                  <Package className="mr-2 h-4 w-4" />{c.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Supplier:</span>
                  <span className="font-medium">{c.supplier}</span>
                </div>

                {/* Supplier Contact */}
                {c.supplierContact && (
                  <div className="space-y-1 text-sm">
                    {c.supplierContact.phone && (
                      <div><Phone className="inline-block mr-1 w-4 h-4" />{c.supplierContact.phone}</div>
                    )}
                    {c.supplierContact.email && (
                      <div><BadgeCheck className="inline-block mr-1 w-4 h-4" />{c.supplierContact.email}</div>
                    )}
                    {c.supplierContact.website && (
                      <div><Globe className="inline-block mr-1 w-4 h-4" />
                        <a href={c.supplierContact.website} target="_blank" rel="noreferrer" className="underline">Website</a>
                      </div>
                    )}
                  </div>
                )}

                {/* Origin & Coordinates */}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />Origin:
                  </span>
                  <span className="font-medium">{c.origin}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <Map className="mr-1 h-4 w-4" />Coords:
                  </span>
                  <span className="font-medium">
                    {c.coordinates
                      ? `${c.coordinates.lat.toFixed(4)}, ${c.coordinates.lng.toFixed(4)}`
                      : '—'}
                  </span>
                </div>

                {/* Material & Weight */}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <Layers className="mr-1 h-4 w-4" />Material:
                  </span>
                  <span className="font-medium">{c.materialType || '—'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Weight (g):</span>
                  <span className="font-medium">{c.weightGrams != null ? c.weightGrams : '—'}</span>
                </div>

                {/* Batch */}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <Tag className="mr-1 h-4 w-4" />Batch:
                  </span>
                  <span className="font-medium">{c.batchNumber}</span>
                </div>

                {/* Certifications */}
                <div className="pt-2">
                  <span className="text-sm text-muted-foreground">Certifications:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {c.certificationDetails?.map((cd, i) => (
                      <Badge key={i} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <BadgeCheck className="mr-1 h-3 w-3" />
                        {cd.name}
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {cd.certId} • {new Date(cd.date).toLocaleDateString()}<br/>
                          <span className="italic">{cd.authority}</span>
                        </div>
                      </Badge>
                    )) || c.certifications.map((cert, i) => (
                        <Badge key={i} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <BadgeCheck className="mr-1 h-3 w-3" />
                          {cert}
                        </Badge>
                    ))
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty or Loading State */}
      {components.length === 0 && (
        <div className="bg-muted/30 border rounded-lg p-6 text-center">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
            </div>
          ) : itemId ? (
            <div>
              <p className="text-muted-foreground">No material data found for this item.</p>
              <p className="text-sm">Try a different Item ID or check for typos.</p>
            </div>
          ) : (
            <div>
              <p className="text-muted-foreground">Enter an Item ID to view material composition.</p>
              <p className="text-sm">Example IDs: ITEM001, ITEM002, ITEM003</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MaterialTraceability;
